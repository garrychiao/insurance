import { useMemo } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Space, Table, Typography, Button, notification } from 'antd';
import { useRequest } from 'ahooks';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore/lite';
import { pet_insurance_translation } from '../config';
import NumberFormat from 'react-number-format';
import { useFirebaseProvider } from '../setup/firebase'

const { Paragraph } = Typography;

export default function PetsInsuranceList(props) {

    const { db } = useFirebaseProvider();

    const { data, run:fetchList } = useRequest(async () => {
        const insurenceReference = collection(db, 'insurance');
        const insuranceSnapshot = await getDocs(insurenceReference);
        const insuranceList = insuranceSnapshot.docs.map(doc => doc.data());
        return insuranceList;
    });

    const { run:deleteInsurance } = useRequest(async (id) => {
        await deleteDoc(doc(db, 'insurance', id));
    }, {
        manual: true,
        onSuccess: () => {
            notification.success({
              message: `刪除成功`,
            });
            fetchList();
          },
    });

    const insuranceItems = useMemo(() => data?.map((item, index) => ({
        key: index,
        ...item
    })) ?? [], [data]);
    
    let columns = insuranceItems.length > 0 ? Object.keys(pet_insurance_translation).filter(i => {
        return !(i === 'admission' || i === 'surgery' || i === 'max_medical_fee' || i === 'appointment')
    }).map((i) => ({
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

    columns.push({
        title: 'Timestamp',
        width: 160,
        key: 'timestamp',
        dataIndex: 'timestamp',
    })

    columns.push({
        title: 'Last Modified',
        width: 160,
        key: 'last_modified',
        dataIndex: 'last_modified',
    })

    columns.push({
        title: 'Actions',
        fixed: 'right',
        width: 160,
        render: (_, record) => (<Space>
            <Link to={record.doc_name}>
                <Button>Edit</Button>
            </Link>
            <Button danger onClick={() => deleteInsurance(record.doc_name)}>Delete</Button>
        </Space>),
    })

    
    return (
    <Space direction='vertical' style={{display: 'flex'}}>
        <Link to='add'>
            <Button>
            Add
            </Button>
        </Link>
        <Table 
            size='small'
            scroll={{
                x: 1200,
                y: 600,
            }}
            dataSource={insuranceItems} 
            columns={columns} />
    </Space>
    )

}
