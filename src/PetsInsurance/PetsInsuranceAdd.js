import { useMemo } from 'react';
import _ from 'lodash';
import {
    Button,
    Cascader,
    DatePicker,
    Space,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
    Typography
} from 'antd';

import { pet_insurance_translation } from '../config';

export default function PetsInsuranceAdd(props) {

    const [form] = Form.useForm();

    const onSubmit = () => {
        const res = form.getFieldsValue(1);
        console.log(res);
    }

    return (
        <Form
            form={form}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
        >
            {
                Object.keys(pet_insurance_translation).map(key => {
                    if (key === 'medical_fee') {
                        return (
                            <div style={{marginLeft: '20px'}}>
                                <hr />
                                <h4 style={{textAlign: 'center'}}>{pet_insurance_translation['medical_fee']}</h4>
                                <Form.Item key='admission' label={pet_insurance_translation['admission']} name='admission'>
                                    <Input placeholder='admission' />
                                </Form.Item>
                                <Form.Item key='appointment' label={pet_insurance_translation['appointment']} name='appointment'>
                                    <Input placeholder='appointment' />
                                </Form.Item>
                                <Form.Item key='max_medical_fee' label={pet_insurance_translation['max_medical_fee']} name='max_medical_fee'>
                                    <Input placeholder='max_medical_fee' />
                                </Form.Item>
                                <Form.Item key='surgery' label={pet_insurance_translation['surgery']} name='surgery'>
                                    <Input placeholder='surgery' />
                                </Form.Item>
                                <hr />
                            </div>
                        )
                    } else if (key === 'certificates') {
                        return <Form.Item key={key} label={pet_insurance_translation[key]} name={key} valuePropName='checked'>
                            <Switch />
                        </Form.Item>
                    } else {
                        return <Form.Item key={key} label={pet_insurance_translation[key]} name={key}>
                            <Input placeholder={key} />
                        </Form.Item>
                    }
                })
            }
            <Form.Item>
                <Button type="primary" onClick={() => onSubmit()}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );

}
