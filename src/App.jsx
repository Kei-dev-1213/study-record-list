import { useEffect, useState } from "react"
import { Form } from "./components/Form";
import { RecordsList } from "./components/RecordsList";
import { DB } from "./supabase/supabase";

function App() {

  // state
  const [titleText, setTitleText] = useState("");
  const [timeText, setTimeText] = useState("");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  // 初期処理
  useEffect(() => { (async () => { getAllRecords() })() }, []);

  // 取得
  const getAllRecords = async () => { setRecords((await DB.getAllRecords()).data) };

  // 登録
  const insertRecord = async (e) => {
    e.preventDefault();
    // チェック
    if (!titleText || !timeText) {
      setError("入力されていない項目があります。");
      return;
    }

    // 登録
    await DB.insertRecord({ title: titleText, time: timeText });
    await getAllRecords();

    // 初期化
    setTitleText("");
    setTimeText("");
    setError("");
  }

  // 削除
  const deleteRecord = async (id) => {
    await DB.deleteRecord(id);
    await getAllRecords();
  }

  return (
    <>
      <h1>学習記録一覧</h1>
      <Form
        titleText={titleText}
        timeText={timeText}
        setTitleText={setTitleText}
        setTimeText={setTimeText}
        insertRecord={insertRecord}
        error={error} />

      <RecordsList
        records={records}
        deleteRecord={deleteRecord} />
    </>
  )
}

export default App
