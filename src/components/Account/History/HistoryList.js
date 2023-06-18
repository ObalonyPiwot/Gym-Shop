/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import './history.css'
import { useEffect } from 'react';

const HistoryList = ({ blogs }) => {

    useEffect(() =>{
        console.log(blogs);
    }, [])

    return (
        <div className='CartPreview'>
            <table className='historyPreview'>
                <thead className='tableHistory'>
                    <tr className='historyHead'>
                        <th>NumerZamówienia</th>
                        <th>Data</th>
                        <th>Cena</th>
                        <th>Status</th>
                        <th>Wiecej</th>
                    </tr>
                </thead>
                <tbody className='tableHistory'>
                    {blogs.map((blog, index) => {

                        return (
                            <tr key={index}>
                            <td>
                                {blog.id}
                            </td>
                            <td>
                                {blog.data}
                            </td>
                            <td>
                                {blog.cena}
                            </td>
                            <td>
                                {blog.czySukces == 'T'? "Zapłacono" : "NieZapłacono"}
                            </td>
                            <td>
                                <a href='#more' className='link'>
                                    SZCZEGÓŁY
                                </a>
                            </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default HistoryList;