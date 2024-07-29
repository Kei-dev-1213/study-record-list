export const RecordsList = ({ records }) => {
    return (
        <>
            <ul style={{ margin: 0 }}>
                {records.map(({ title, time }, index) => (
                    <li key={`${title}_${index}`}>
                        {`${title} ${time}時間`}
                    </li>
                ))}
            </ul>
            合計時間：{records.reduce((accu, { time }) => accu + parseInt(time), 0)}/1000(h)
        </>
    )
}