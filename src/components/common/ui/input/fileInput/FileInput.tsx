import React, { useRef, useState } from 'react';
import styles from './fileInput.module.scss'
import { toast } from 'react-toastify';
import clsx from 'clsx';

interface FileInputProps {
    file?: File | null;
    setFile?: (f: File | null) => void;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    maxSize?: number; // in MB
    width?: string | number;
    height?: string | number;
    label?: string;
    description?: string;
    icon?: string;
}

export default function FileInput({
    file: controlledFile,
    setFile: setControlledFile,
    accept,
    multiple = false,
    disabled = false,
    maxSize = 10,
    width = "100%",
    label = "파일 업로드",
    description = "파일을 업로드 해주세요.",
    icon = 'illustrator.svg',
}: FileInputProps) {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [uncontrolledFile, setUncontrolledFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const file = controlledFile === undefined ? uncontrolledFile : controlledFile;
    const fileSize = Array.isArray(file) ? file.reduce((acc, f) => acc + f.size / 1024 / 1024, 0) : file ? (file.size / 1024 / 1024).toFixed(2) : 0;
    const setFile = setControlledFile ?? setUncontrolledFile;

    const openFilePicker = () => inputRef.current?.click();
    const onPickFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        if (maxSize) {
            for (let i = 0; i < files.length; i++) {
                if (files[i].size / 1024 / 1024 >= maxSize) {
                    toast.error(`${maxSize}MB 미만의 파일만 가능합니다`);
                    e.target.value = "";
                    return;
                }
            }
        }
        setFile(multiple ? Array.from(files) as unknown as File : files[0]);
    }

    const validFileType = (files: FileList) => {
        if (!accept) return true;
        const acceptedTypes = new Set(accept.split(',').map(type => type.trim()));
        for (let i = 0; i < files.length; i++) {
            const fileType = files[i].type;
            const fileExtension = '.' + files[i].name.split('.').pop();
            if (!acceptedTypes.has(fileType) && !acceptedTypes.has(fileExtension)) {
                return false;
            }
        }
        return true;
    }

    const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        if (disabled) return;
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (!files || files.length === 0) return;
        if (!validFileType(files)) {
            toast.error("허용되지 않는 파일 형식입니다.");
            e.dataTransfer.clearData();
            return;
        }
        if (maxSize) {
            for (let i = 0; i < files.length; i++) {
                if (files[i].size / 1024 / 1024 >= maxSize) {
                    toast.error(`${maxSize}MB 미만의 파일만 가능합니다`);
                    return;
                }
            }
        }
        setFile(multiple ? Array.from(files) as unknown as File : files[0]);
        e.dataTransfer.clearData();
    }

    const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        if (disabled) return;
        if (!isDragging) setIsDragging(true);
    }

    const onDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        if (disabled) return;
        if (isDragging) setIsDragging(false);
    }

    return (
        <div
            className={clsx(styles.fileInput, isDragging && styles.dragging)}
            style={{ width, opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
        >
            <div className={styles.left}>
                <div className={styles.label}>
                    <img src={`/images/icons/${icon}`} alt="icon" />
                    <span onClick={openFilePicker}>{file ? file.name : label}</span>
                    {file && <button onClick={() => setFile(null)}>&times;</button>}
                </div>
                <div className={styles.description}>{file ? `${fileSize} / ${maxSize}MB` : description}</div>
            </div>
            <div className={styles.filePicker} onClick={openFilePicker}>파일 선택</div>
            <input
                style={{ display: 'none' }}
                type="file"
                ref={inputRef}
                className={styles.input}
                onChange={onPickFile}
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                aria-disabled={disabled}
            />
        </div>
    );
}