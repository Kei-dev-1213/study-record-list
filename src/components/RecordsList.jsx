export const RecordsList = ({ records, deleteRecord }) => {
    return (
        <>
            <ul style={{ margin: 0 }}>
                {records.map(({ id, title, time }) => (
                    <li key={id}>
                        <div>
                            {`${title} ${time}時間`}
                            <button onClick={deleteRecord.bind(null, id)}>削除</button>
                        </div>
                    </li>
                ))}
            </ul>
            合計時間：{records.reduce((accu, { time }) => accu + parseInt(time), 0)}/1000(h)
        </>
    )
}