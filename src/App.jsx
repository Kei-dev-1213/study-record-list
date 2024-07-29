import { useState } from "react"
import { Form } from "./components/Form";
import { RecordsList } from "./components/RecordsList";

function App() {

  // state
  const [titleText, setTitleText] = useState("");
  const [timeText, setTimeText] = useState("");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  // 登録
  const regist = (e) => {
    e.preventDefault();
    // チェック
    if (!titleText || !timeText) {
      setError("入力されていない項目があります。");
      return;
    }

    // 登録
    setRecords(records => [...records, {
      title: titleText,
      time: timeText
    }]);

    // 初期化
    setTitleText("");
    setTimeText("");
    setError("");
  }

  return (
    <>
      <h1>学習記録一覧</h1>
      <Form
        titleText={titleText}
        timeText={timeText}
        setTitleText={setTitleText}
        setTimeText={setTimeText}
        regist={regist}
        error={error} />

      <RecordsList records={records} />
    </>
  )
}

export default App
