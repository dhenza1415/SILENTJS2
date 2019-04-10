const LineConnect = require('./connect');
const LINE = require('./main.js');
console.info("\n\
======================================================\n\
BotName: LINE SILENT JS NEW_2019\n\
Rework : TEAM SILENTJS\n\
Terima Kasih Kepada @Alfathdirk @TCR_TEAM @Raka_GoogleX\n\
======================================================\n\
\nNOTE : Ini Adalah AlphatJS Lama Buatan @Alfathdirk @TCR_TEAM \n Dan Ini Telah Dikembangin Oleh @TAB_TEAM\n& Di upgrade ulang olleh Team SILENTJS\nTolong Untuk Tidak Perjual-Belikan Script Ini \n gunakan dengan bijak\n\
===============☄SILENT JS NEW_2019☄=================");

/*
| This constant is for auth/login
|
| Change it to your authToken / your email & password
*/
const auth = {
	authToken: ' TOKEN IOSPAD ',
	certificate: ' Taro Cerf Disini ',
	email: '',
	password: ''
}

let client =  new LineConnect();
//let client =  new LineConnect(auth);

client.startx().then(async (res) => {
	while(true) {
		try {
			ops = await client.fetchOps(res.operation.revision);
		} catch(error) {
			console.log('error',error)
		}
		for (let op in ops) {
			if(ops[op].revision.toString() != -1){
				res.operation.revision = ops[op].revision;
				LINE.poll(ops[op])
			}
		}
		//LINE.aLike() //AutoLike (CAUSE LAG)
	}
});
