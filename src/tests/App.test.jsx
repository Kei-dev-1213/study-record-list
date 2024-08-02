/**
 * @jest-environment jsdom
 */
import React from "react";
import App from "../App";
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";

describe("初期表示のテスト", () => {

    test("タイトルが画面上に表示されること", () => {
        render(<App />);
        const title = screen.getByText("学習記録一覧");
        const headElement = screen.getByRole('heading', { name: '学習記録一覧' });
        expect(headElement).toBeInTheDocument();
    });
});