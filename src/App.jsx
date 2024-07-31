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
  const [isLoading, setIsLoading] = useState(true);

  // 初期処理
  useEffect(() => {
    (async () => {
      await fetchAllRecords()
      setIsLoading(false);
    })();
  }, []);

  // 取得
  const fetchAllRecords = async () => {
    setRecords((await DB.getAllRecords()).data)
  };

  // 登録
  const onClickRegist = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // チェック
    if (!titleText.trim() || !timeText.trim()) {
      setError("入力されていない項目があります。");
      setIsLoading(false);
      return;
    }

    // 登録
    await DB.insertRecord({ title: titleText, time: timeText });
    await fetchAllRecords();

    // 初期化
    setTitleText("");
    setTimeText("");
    setError("");
    setIsLoading(false);
  }

  // 削除
  const onClickDelete = async (id) => {
    setIsLoading(true);
    await DB.deleteRecord(id);
    await fetchAllRecords();
    setIsLoading(false);
  }

  return (
    <>
      <h1>学習記録一覧</h1>
      <Form
        titleText={titleText}
        timeText={timeText}
        setTitleText={setTitleText}
        setTimeText={setTimeText}
        onClickRegist={onClickRegist}
        error={error} />

      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <RecordsList
          records={records}
          onClickDelete={onClickDelete} />
      )}
    </>
  )
}

export default App
