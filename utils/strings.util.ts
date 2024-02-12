export const readableRunTime = (timeInSeconds: any) => {
  if(timeInSeconds > 5399) {
    return Math.floor(timeInSeconds / 3600) + ':'
        + ((Math.floor((timeInSeconds % 3600) / 60) >= 10)
          ? (Math.floor((timeInSeconds % 3600) / 60))
          : '0'
        + (Math.floor((timeInSeconds % 3600) / 60))) + ':'
        + ((timeInSeconds % 60) >= 10 ? (timeInSeconds % 60) : '0' + (timeInSeconds % 60));
  }  else {
    return Math.floor(timeInSeconds / 60) + ':' + ((timeInSeconds % 60) >= 10 ? (timeInSeconds % 60) : '0' + (timeInSeconds % 60));
  }
}

export async function copyTextToClipboard(text: string | undefined) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(<string>text);
  } else {
    return document.execCommand('copy', true, text);
  }
}