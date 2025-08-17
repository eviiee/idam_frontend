import { ReactNode } from 'react'
import styles from './adminTable.module.scss'

interface AdminTableProps {
    labels: string[]
    tableContent: ReactNode[][]
}

export default function AdminTable(props : AdminTableProps) {

    const headers = props.labels.map((label,i) => <th key={i}>{label}</th>)
    const rows = props.tableContent.map(content => )
    const contents = props.tableContent.map((content) => <tr>
        {

        }
    </tr>)

    return (
        <table>
            <thead>
                <tr>
                    {headers}
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    )

}