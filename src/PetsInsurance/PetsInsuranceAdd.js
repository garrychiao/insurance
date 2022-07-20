import { useMemo } from 'react';
import _ from 'lodash';
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
    Typography
  } from 'antd';
import { useRequest } from 'ahooks';
import db from '../setup/firebase/firebaseSetup';
import { collection, getDocs } from 'firebase/firestore/lite';
// import { Divider, Radio,  } from 'antd';
import { pet_insurance_translation } from '../config';
import NumberFormat from 'react-number-format';

const { Paragraph } = Typography;

export default function PetsInsuranceAdd(props) {

    return (
        <Form
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
        >
            <Form.Item label="Form Size" name="size">
                <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Input">
                <Input />
            </Form.Item>
            <Form.Item label="Select">
                <Select>
                    <Select.Option value="demo">Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="TreeSelect">
                <TreeSelect
                    treeData={[
                        {
                            title: 'Light',
                            value: 'light',
                            children: [
                                {
                                    title: 'Bamboo',
                                    value: 'bamboo',
                                },
                            ],
                        },
                    ]}
                />
            </Form.Item>
            <Form.Item label="Cascader">
                <Cascader
                    options={[
                        {
                            value: 'zhejiang',
                            label: 'Zhejiang',
                            children: [
                                {
                                    value: 'hangzhou',
                                    label: 'Hangzhou',
                                },
                            ],
                        },
                    ]}
                />
            </Form.Item>
            <Form.Item label="DatePicker">
                <DatePicker />
            </Form.Item>
            <Form.Item label="InputNumber">
                <InputNumber />
            </Form.Item>
            <Form.Item label="Switch" valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item label="Button">
                <Button>Button</Button>
            </Form.Item>
        </Form>
    );

}
