export function formatDate1(value) {
    let date = new Date(value);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    let day = date.getDate();
    day = day < 10 ? ('0' + day) : day;
    return year + '-' + month + '-' + day ;
  }
	
	export function formatDate2(value) {
	    let date = new Date(value);
			
			// 年
	    let year = date.getFullYear();
			//月
	    let month = date.getMonth() + 1;
			// 日
	    let day = date.getDate();
			// 时
			let hour = date.getHours()
			hour = hour < 10 ? ('0' + hour) : hour;
			// 分
			let min = date.getMinutes()
			min = min < 10 ? ('0' + min) : min;
			
	    return year + '年' + month + '月' + day + '日  '+ hour + ':' + min;
	  }