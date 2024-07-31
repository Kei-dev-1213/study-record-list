export const Form = ({ onClickRegist, titleText, setTitleText, timeText, setTimeText, error }) => {
    return (
        <form onSubmit={onClickRegist}>
            学習内容
            <input type="input" value={titleText} onChange={e => setTitleText(e.target.value)} />
            <br />
            学習時間
            <input type="number" value={timeText} onChange={e => setTimeText(e.target.value)} />時間
            <br />
            入力されている学習内容：{titleText}
            <br />
            入力されている時間：{timeText}時間
            <br />
            <button>登録</button>
            <div style={{ color: "red" }}>
                {error}
            </div>
        </form>
    )
}