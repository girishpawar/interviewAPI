const internalIp = require('internal-ip');
var ipv4 = ''; 
var dbUrl = '';

(async () => {
    console.log(await internalIp.v6());
    //=> 'fe80::1'
 
    console.log(await internalIp.v4());
    //=> '10.0.0.79'
})();

// Get the Ip of current host
ipv4 = internalIp.v4.sync();
console.log("Ip is:"+ipv4);
if(ipv4 == '172.31.25.253')
{
	dbUrl = 'mongodb://127.0.0.1:27017/interview';
	console.log("on Server DB");
}else if(ipv4 == '192.168.2.73')
{
	dbUrl = 'mongodb://admin:admin123@localhost:27017/interview?authSource=admin'
	console.log("On localhost server");
}


module.exports = {
	url: dbUrl
}
