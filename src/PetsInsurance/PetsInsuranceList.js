import { useMemo } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Space, Table, Typography, Button } from 'antd';
import { useRequest } from 'ahooks';
import { collection, getDocs } from 'firebase/firestore/lite';
import { pet_insurance_translation } from '../config';
import NumberFormat from 'react-number-format';
import { useFirebaseProvider } from '../setup/firebase'

const { Paragraph } = Typography;

export default function PetsInsuranceList(props) {

    const { db } = useFirebaseProvider();

    const { data, loading, run } = useRequest(async () => {
        const insurenceReference = collection(db, 'insurance');
        const insuranceSnapshot = await getDocs(insurenceReference);
        const insuranceList = insuranceSnapshot.docs.map(doc => doc.data());
        return insuranceList;
    });

    const insuranceItems = useMemo(() => data?.map((item, index) => ({
        key: index,
        ...item
    })) ?? [], [data]);
    
    const columns = insuranceItems.length > 0 ? Object.keys(pet_insurance_translation).map((i) => ({
        title: pet_insurance_translation[i],
        dataIndex: i,
        key: i,
        fixed: i === 'name' ? 'left' : null,
        width: i === 'medical_fee' ? 300 : 150,
        render: (item) => {
            if (_.isArray(item)) {
                return item.join(' - ')
            } else if (_.isObject(item)) {
                return Object.keys(item).map(key => (<Paragraph key={`${key}-${i}`}>
                    {pet_insurance_translation[key] ?? 'Default'} : {typeof(item[key]) === 'number' ? <NumberFormat value={item[key]} thousandSeparator={true} displayType={'text'} /> : item[key]}
                </Paragraph>))
            } else if (_.isBoolean(item)) {
                return item ? 'yes' : 'no'
            } else if (_.isNumber(item)) {
                return <NumberFormat value={item} thousandSeparator={true} displayType={'text'} />
            } else {
                return <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                {item}
              </div>
            }
        },
    })) : [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
    ]

    return (
    <Space direction='vertical' style={{display: 'flex'}}>
        <Link to='add'>
            <Button>
            Add
            </Button>
        </Link>
        <Table 
            scroll={{
                x: 1200,
                y: 500,
            }}
            dataSource={insuranceItems} 
            columns={columns} />
    </Space>
    )

}
