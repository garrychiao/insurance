import { useRequest } from 'ahooks';
import {
    Button, Form, Input, Switch, notification
} from 'antd';
import { doc, setDoc, getDoc } from 'firebase/firestore/lite';
import { useFirebaseProvider } from '../setup/firebase'
import { pet_insurance_translation } from '../config';
import moment from 'moment';
import { useParams, useNavigate, Link } from 'react-router-dom';


export default function PetsInsuranceEdit(props) {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { db } = useFirebaseProvider();
    const { id } = useParams();

    // console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
    useRequest(async () => {
        const insurenceRes = await getDoc(doc(db, "insurance", id))
        return insurenceRes.data() ?? {};
    }, {
        onSuccess: (insuranceData) => {
            const initialValues = {
                ...insuranceData,
                appointment: insuranceData?.medical_fee?.appointment,
                admission: insuranceData?.medical_fee?.admission,
                surgery: insuranceData?.medical_fee?.surgery,
                max_medical_fee: insuranceData?.medical_fee?.max_medical_fee,
                valid_age: insuranceData?.valid_age?.join(",") ?? '0,0',
            }
            form.setFieldsValue(initialValues);
        }
    });

    // add reference
    const { run:addInsurance } = useRequest(async (values) => {
        console.log(values)
        const insurenceAddRes = await setDoc(doc(db, "insurance", id), {
            doc_name: id,
            ...values,
            last_modified: moment().format('YYYY-MM-DD HH:mm:ss'),
        }, { merge: true })
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
        values.medical_fee = {
            admission: values.admission ?? null,
            appointment: values.appointment ?? null,
            max_medical_fee: values.max_medical_fee ?? null,
            surgery: values.surgery ?? null,
        }

        delete values.admission
        delete values.appointment
        delete values.max_medical_fee
        delete values.surgery

        Object.keys(values).forEach(k => {
            if (values[k] === undefined) {
                values[k] = null
            }
        });
        
        const formattedValues = {
            ...values,
            valid_age: values.valid_age.split(',').map(i => parseFloat(i)),
        }

        addInsurance(formattedValues);

    }

    return (
        <div style={{margin: '20px 50px', padding: '20px', border: '1px solid #a0a0a0'}}>
            <Link to="../">
                <Button>
                    Back
                </Button>
            </Link>
            <Form
            form={form}
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
        >
            {
                Object.keys(pet_insurance_translation).map(key => {
                    if (key === 'medical_fee') {
                        return <></>
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
