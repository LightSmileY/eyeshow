export const uuid = () => {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
}

export const getTime = time => {
    year = time.getFullYear(),
    month = time.getMonth() + 1,
    day = time.getDate(),
    hour = time.getHours(),
    minute = time.getMinutes(),
    second = time.getSeconds()
  return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second
}

export const arraySort = {
  // 发表时间排序
  sortByDate(arr){
    arr.sort((a,b) => a.postTime - b.postTime)
  },
  // 点赞数排序
  sortByLikeCount(arr){
    arr.sort((a,b) => a.likeCount - b.likeCount)
  },
  // 收藏数排序
  sortByCollectionCount(arr){
    arr.sort((a,b) => a.collectionCount - b.collectionCount)
  },
  // 转发数排序
  sortByForwardCount(arr){
    arr.sort((a,b) => a.forwardCount - b.forwardCount)
  }
}