import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { DB } from "../supabase";

const initialRecords = [
  { id: 1, title: "Reactの勉強", time: 1 },
  { id: 2, title: "Vueの勉強", time: 2 },
  { id: 3, title: "TypeScriptの勉強", time: 3 },
];

// モック定義
jest.mock("../supabase", () => ({
  DB: {
    fetchAllRecords: jest.fn(),
    insertRecord: jest.fn().mockResolvedValue([]),
    deleteRecord: jest.fn().mockResolvedValue([]),
  },
}));

/*
 * [学習記録一覧テスト]
 * 初期表示、登録、削除のテスト
 */
describe("初期表示のテスト", () => {
  test("[正常系]タイトルが画面上に表示されていること", async () => {
    // モック化
    DB.fetchAllRecords.mockResolvedValue({ data: [] });

    // 実行
    render(<App />);
    // 検証
    const headElement = screen.getByRole("heading", { name: "学習記録一覧" });
    await waitFor(() => {
      expect(headElement).toBeInTheDocument();
    });
  });

  test("[正常系]ローディング中であることを示す文言が表示されていること", async () => {
    // モック化
    DB.fetchAllRecords.mockResolvedValue({ data: [] });

    // 実行
    render(<App />);
    // 検証
    const loadingWord = screen.getByText("Loading...");
    await waitFor(() => {
      expect(loadingWord).toBeInTheDocument();
    });
  });

  test("[正常系]学習記録が画面に表示されていること", async () => {
    // モック化
    DB.fetchAllRecords.mockResolvedValue({ data: initialRecords });
    await act(async () => {
      render(<App />);
    });
    // 検証
    await waitFor(() => {
      const initialRecord1 = screen.getByText("Reactの勉強 1時間");
      const initialRecord2 = screen.getByText("Vueの勉強 2時間");
      const initialRecord3 = screen.getByText("TypeScriptの勉強 3時間");
      const sumTimeText = screen.getByText("合計時間：6/1000(h)");
      expect(initialRecord1).toBeInTheDocument();
      expect(initialRecord2).toBeInTheDocument();
      expect(initialRecord3).toBeInTheDocument();
      expect(sumTimeText).toBeInTheDocument();
    });
  });
});

describe("学習記録登録のテスト", () => {
  test("[正常系]登録ボタン押下後、学習記録が画面上に表示されること", async () => {
    // モック化
    DB.fetchAllRecords
      .mockResolvedValueOnce({ data: initialRecords })
      .mockResolvedValueOnce({ data: [...initialRecords, { id: 4, title: "追加の勉強", time: 4 }] });

    // 実行
    await act(async () => {
      render(<App />);
    });

    // 検証(登録後の要素が存在しないこと)
    await waitFor(() => {
      expect(screen.queryByText("追加の勉強 4時間")).not.toBeInTheDocument();
      const sumTimeText = screen.getByText("合計時間：6/1000(h)");
      expect(sumTimeText).toBeInTheDocument();
    });

    // 入力
    const titleInput = screen.getByRole("textbox", { name: "title" });
    await userEvent.type(titleInput, "追加の勉強");
    const timeInput = screen.getByRole("spinbutton", { name: "time" });
    await userEvent.type(timeInput, "4");
    // 登録ボタン押下
    const registButton = screen.getByRole("button", { name: "登録" });
    fireEvent.click(registButton);

    // 検証
    await waitFor(() => {
      const registeredRecord = screen.getByText("追加の勉強 4時間");
      expect(registeredRecord).toBeInTheDocument();
      const sumTimeText = screen.getByText("合計時間：10/1000(h)");
      expect(sumTimeText).toBeInTheDocument();
    });
  });

  test("[異常系]入力項目に値を設定せず登録ボタン押下後、画面上にエラーメッセージが表示されること", async () => {
    // モック化
    DB.fetchAllRecords.mockResolvedValue({ data: [] });

    // 実行
    await act(async () => {
      render(<App />);
    });

    // 入力項目に値を設定しない
    // 登録ボタン押下
    const registButton = screen.getByRole("button", { name: "登録" });
    fireEvent.click(registButton);

    // 検証
    await waitFor(() => {
      const registedRecord = screen.getByText("入力されていない項目があります。");
      expect(registedRecord).toBeInTheDocument();
    });
  });
});

describe("学習記録削除のテスト", () => {
  test("[正常系]削除ボタン押下後、学習記録が画面上に表示されないこと", async () => {
    // モック化
    DB.fetchAllRecords
      .mockResolvedValueOnce({ data: [...initialRecords, { id: 4, title: "削除予定の勉強", time: 4 }] })
      .mockResolvedValueOnce({ data: initialRecords });

    // 実行
    await act(async () => {
      render(<App />);
    });

    // 検証(削除前の要素が存在すること)
    await waitFor(() => {
      const toBeDeletedRecord = screen.getByText("削除予定の勉強 4時間");
      expect(toBeDeletedRecord).toBeInTheDocument();
      const sumTimeText = screen.getByText("合計時間：10/1000(h)");
      expect(sumTimeText).toBeInTheDocument();
    });

    // 入力
    // 削除ボタン押下
    const deleteButton = screen.getAllByRole("button", { name: "削除" })[3];
    fireEvent.click(deleteButton);

    // 検証
    await waitFor(() => {
      expect(screen.queryByText("削除予定の勉強 4時間")).not.toBeInTheDocument();
      const sumTimeText = screen.getByText("合計時間：6/1000(h)");
      expect(sumTimeText).toBeInTheDocument();
    });
  });
});
