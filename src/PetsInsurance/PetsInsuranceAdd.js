import _ from 'lodash';
import { useRequest } from 'ahooks';
import {
    Button, Form, Input, Switch, notification
} from 'antd';
import { doc, setDoc } from 'firebase/firestore/lite';
import { useFirebaseProvider } from '../setup/firebase'
import { pet_insurance_translation } from '../config';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


export default function PetsInsuranceAdd(props) {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { db } = useFirebaseProvider();

    // console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
    // add reference
    const { data, loading, run:addInsurance } = useRequest(async (values) => {
        const { insurance_category, sub_category, issued_by } = values
        const docName = `${insurance_category}-${sub_category}-${issued_by}-${moment().format('x')}`;
        const insurenceAddRes = await setDoc(doc(db, "insurance", docName), {
            ...values,
            doc_name: docName,
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        })
        console.log(insurenceAddRes);
        return insurenceAddRes;
    }, {
        manual: true,
        onSuccess: () => {
            // console.log(msg);
            notification.success({
              message: `更新成功`,
            });
            navigate('../');
          },
    });

    const onSubmit = () => {

        let values = form.getFieldsValue(1);
        console.log(values);
        values.medical_fee = {
            admission: values.admission,
            appointment: values.appointment,
            max_medical_fee: values.max_medical_fee,
            surgery: values.surgery,
        }

        delete values.admission
        delete values.appointment
        delete values.max_medical_fee
        delete values.surgery

        const formattedValues = {
            ...values,
            valid_age: values.valid_age.split(',').map(i => parseFloat(i)),
        }

        console.log(formattedValues)

        addInsurance(formattedValues);

    }

    const initialValues = {
        name: '保單名稱 Demo',
        insurance_category: '產險-寵物險',
        sub_category: '狗',
        issued_by: '國泰易安網',
        medical_fee: 10000,
        appointment: 10000,
        admission: 10000,
        surgery: 10000,
        max_medical_fee: 10000,
        harm: 10000,
        accommodation: 10000,
        seek: 10000,
        funeral: 10000,
        regain: 10000,
        trip_cancel: 10000,
        valid_age: '8,152',
        max_weekly_renewal: 806,
        certificates: true,
    }

    return (
        <div style={{margin: '20px 50px', padding: '20px', border: '1px solid #a0a0a0'}}>
            <Form
            form={form}
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            initialValues={initialValues}
        >
            {
                Object.keys(pet_insurance_translation).map(key => {
                    if (key === 'medical_fee') {
                        return 
                    } else if (key === 'certificates') {
                        return <Form.Item key={key} label={pet_insurance_translation[key]} name={key} valuePropName='checked'>
                            <Switch />
                        </Form.Item>
                    } else if (key === 'admission' || key === 'surgery' || key === 'max_medical_fee' || key === 'appointment') {
                        return <Form.Item key={key} label={`${pet_insurance_translation['medical_fee']}-${pet_insurance_translation[key]}`} name={key}>
                            <Input placeholder='name' />
                        </Form.Item>
                    } else if (key === 'name' || key === 'insurance_category' || key === 'sub_category' || key === 'issued_by') {
                        return <Form.Item key={key} label={pet_insurance_translation[key]} name={key}>
                            <Input placeholder={key} />
                        </Form.Item>
                    } else if (key === 'valid_age') {
                        return <Form.Item key={key} label={`${pet_insurance_translation[key]} (seperate by , )`} name={key}>
                            <Input placeholder='8,152' />
                        </Form.Item>
                    } else {
                        return <Form.Item key={key} label={pet_insurance_translation[key]} name={key}>
                            <Input type='number' placeholder={key} />
                        </Form.Item>
                    }
                })
            }
            <Form.Item style={{textAlign: 'right'}}>
                <Button type="primary" onClick={() => onSubmit()}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </div>
    );
}
