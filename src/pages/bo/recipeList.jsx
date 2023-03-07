import {Button, Layout, Table} from 'antd';
import { useEffect, useState } from 'react';
import CustomLayout from "../../components/common/layout";
import Head from "next/head";
import Link from "next/link";
const columns = [
    {
        title: 'No',
        dataIndex: 'key',
        width: '20%',
    },
    {
        title: '음식명',
        dataIndex: 'name',
        width: '20%',
        render: (_, record) =>
            <Link href={`/bo/recipeDetail/${record.key}`}>
                {record.name}
            </Link>
    },
    {
        title: '종류',
        dataIndex: 'type',
    },
];

export default function RecipeList() {
    const [data, setData] = useState();
    const [totalPages, setTotalPages] = useState();
    const [loading, setLoading] = useState(false);

    const fetchData = (page) => {
        setLoading(true);
        fetch(`/api/bo/recipeData?page=${page}&size=10`)
            .then((res) => res.json())
            .then((results) => {
                         setData(results.data)
                         setTotalPages(results.totalPages)
                         setLoading(false);
        })
        // fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`)
        //     .then((res) => res.json())
        //     .then((results) => {
        //         setData(results.data)
        //         setTotalPages(results.totalPages)
        //         setLoading(false);
        //         console.log(results)
        //     })
    };

    useEffect(() => {
        fetchData(1);
    }, []);

    return (
        <CustomLayout>
            <Head>
                    <title>타이틀</title>
            </Head>
            <div style={{textAlign: 'right'}}>
                <Link href="/bo/recipeDetail/0">
                <Button type="primary" style={{width: '30%'}} ghost>
                    등록
                </Button>
                </Link>

            </div>
            <Table
                loading={loading}
                columns={columns}
                dataSource={data}
                pagination={
                    {
                        pageSize: 10,
                        total: totalPages,
                        onChange:(page)=>{
                            fetchData(page);
                        }
                    }
                }
            />
        </CustomLayout>
    );
};