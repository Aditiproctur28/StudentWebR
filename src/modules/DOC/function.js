export const getFileName = (name) => {
    if (name === undefined || name === null) {
        return '';
    }
    let str = name.split('.');
    return str[0];
}

export const getExtension = (name) => {
    if (name === undefined || name === null) {
        return '';
    }
    let str = name.split('.');
    return str[str.length - 1];
}

export const getMimeType = (name) => {
    let type = getExtension(name);

    switch (type) {
        case "doc":
            return "application/msword";
        case "docx":
            return "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        case "ppt":
            return "application/vnd.ms-powerpoint";
        case "pptx":
            return "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        case "xls":
            return "application/vnd.ms-excel";
        case "xlsx":
            return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        case "pdf":
            return "application/pdf";
        case "png":
            return "image/png";
        case "bmp":
            return "application/x-MS-bmp";
        case "gif":
            return "image/gif";
        case "jpg":
            return "image/jpeg";
        case "jpeg":
            return "image/jpeg";
        case "aac":
            return "audio/x-aac";
        case "mp3":
            return "audio/mpeg";
        case "mp4":
            return "video/mp4";
        case "txt":
            return "text/plain";
        case "zip":
            return "application/zip";
        case "tif":
            return "image/tiff";
        case "rtf":
            return "application/rtf";
        case "wav":
            return "audio/wav";
        default:
            return "*/*";
    }
}