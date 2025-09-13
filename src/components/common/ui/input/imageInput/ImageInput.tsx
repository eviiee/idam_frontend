"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from './imageInput.module.scss'
import clsx from "clsx";
import { ImagePlus, X } from "lucide-react";

type Props = {
  /** 정사각형 한 변 길이(px, rem 등) – 기본 200px */
  width?: string | number;
  height?: string | number;
  /** 허용할 파일 타입 */
  accept?: string;
  file?: File | null
  setFile?: (f: File | null) => void
  maxSize?: number
  square?: boolean
};

export default function ImageInput({
  width = "200px",
  height = "200px",
  accept = "image/png, image/jpeg, image/jpg, image/gif",
  file: controlledFile,
  setFile: setControlledFile,
  square = true,
  maxSize,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uncontrolledFile, setUncontrolledFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const file = controlledFile === undefined ? uncontrolledFile : controlledFile
  const setFile = setControlledFile ?? setUncontrolledFile

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
    if (maxSize && f.size / 1024 / 1024 >= maxSize) {
      alert(`${maxSize}MB 미만의 이미지만 가능합니다`)
      e.target.value = ""
      return

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

  // 취소
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
        className={clsx(styles.input, square && styles.square, isDragging && styles.dragging, previewUrl && styles.hasPreview)}
        onClick={openFilePicker}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openFilePicker()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        style={{
          width: width,
          height: height,
          backgroundImage: previewUrl ? `url(${previewUrl})` : undefined,
        }}
      >
        {!previewUrl && (
          <div className={styles.placeholder}>
            <ImagePlus size="2.5rem" />
            <span>드래그 & 드롭 / <u>이미지 선택</u></span>
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
      {file && (
        <div className={styles.actions}>
          <button type="button" onClick={cancel} disabled={!file}>
            <X size={"1rem"} />
          </button>
        </div>
      )}
    </div >
  );
}
