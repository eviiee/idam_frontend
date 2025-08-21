"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from './imageInput.module.scss'
import clsx from "clsx";

type Props = {
    /** 확정 시 선택된 파일을 넘겨받음 */
    onConfirm?: (file: File) => void;
    /** 정사각형 한 변 길이(px, rem 등) – 기본 200px */
    size?: string;
    /** 허용할 파일 타입 */
    accept?: string;
};

export default function ImageInput({
    onConfirm,
    size = "200px",
    accept = "image/*",
}: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // 파일 선택 트리거
    const openFilePicker = () => inputRef.current?.click();

    // 파일 변경 처리
    const onPickFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        if (!f.type.startsWith("image/")) {
            alert("이미지 파일만 업로드할 수 있어요.");
            e.target.value = "";
            return;
        }
        setFile(f);
    };

    // 미리보기 URL 생성/해제
    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    // 드래그&드롭 지원 (선택 사항)
    const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const f = e.dataTransfer.files?.[0];
        if (!f) return;
        if (!f.type.startsWith("image/")) {
            alert("이미지 파일만 업로드할 수 있어요.");
            return;
        }
        setFile(f);
    };

    const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    // 확정/취소
    const confirm = () => {
        if (file && onConfirm) onConfirm(file);
    };
    const cancel = () => {
        setFile(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
    <div className={styles.wrap}>
      <div
        role="button"
        tabIndex={0}
        aria-label="이미지 업로드"
        className={clsx(styles.square, isDragging && styles.dragging, previewUrl && styles.hasPreview)}
        onClick={openFilePicker}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openFilePicker()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        style={{
          width: size,
          // 높이는 CSS에서 aspect-ratio로 1:1 유지
          backgroundImage: previewUrl ? `url(${previewUrl})` : undefined,
        }}
      >
        {!previewUrl && (
          <div className={styles.placeholder}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M19 3H5a2 2 0 0 0-2 2v14l4-4h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-3 6h-2v2h-4V9H8V7h2V5h4v2h2v2Z"
                fill="currentColor"
              />
            </svg>
            <span>이미지 추가</span>
            <small>(클릭 또는 드래그)</small>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={onPickFile}
          hidden
        />
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={confirm}
          disabled={!file}
          title={!file ? "이미지를 먼저 선택하세요" : "이 이미지로 확정"}
        >
          확정
        </button>
        <button type="button" onClick={cancel} disabled={!file}>
          취소
        </button>
      </div>
    </div >
  );
}
