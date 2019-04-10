const LineAPI = require('./api');
const request = require('request');
const fs = require('fs');
const unirest = require('unirest');
const webp = require('webp-converter');
const path = require('path');
const rp = require('request-promise');
const config = require('./config');
const { Message, OpType, Location } = require('../curve-thrift/line_types');

//NOTE JANGAN PERJUAL-BELIKAN SC!! KALO SHARE GPP
//NOTE JANGAN TARO MID SAMA DI STAFF DAN ADMIN
//CONTOH MID LU UDH DITARO DI ADMIN JADI GAUSAH TARO DI STAFF JUGA!

var myStaff = ['']; //Taro Mid Yang Mau Dijadiin Staff/Wakil Admin

const myAdmin = ['ub1c5a71f27b863896e9d44bea857d35b','ufdc20b3a00b5e8f31e4f91017eb361b0','u3160d2dd9658a7acec1a2480baa6a738']; //Mid Lu Supaya Jadi Admin

const myAssist = ['']; //Mid Bot Lu Jika Ada Bot 2 Atau Lebih

const myBot = ['']; //Taro Mid Bot Lu Kesini (Maksud Gw Bot Yang Pake Sc Ini)
const BoT = ['ueff8f78401c867593c6ddc8aeb8c649d','ubace7dd5006c744f5aef3e412c04e219','uf658d58086736afcfe1e1c65d290a2bf','u4382d72a8552bf1024957a02728b6ffe','u08719b87716863d883afc9f79e39a556']
var BlackListPermanen = ['u502fd6dcacda727a8d85bcb6708fa403'];
var BackupList = [];
var TbanList = []; //Users Banned Chat
var commandGroup = [];
var banList = []; //Banned list
var vx = {};var midnornama,pesane,kickhim;var waitMsg = "no";//DO NOT CHANGE THIS
var komenTL = "AutoLike by \nline://ti/p/~dhenz415"; //Comment for timeline
var bcText = "";//Jangan Di Apa-Apa In Oke Beb :')
var limitposts = '10'; //Output timeline post

function isAdmin(param) {
    return myAdmin.includes(param);
}

function isStaff(param) {
    return myStaff.includes(param);
}

function isBot(param) {
     return myBot.includes(param);
}

function isAssist(param) {
     return myAssist.includes(param);
}

function isBanned(param) {
    return banList.includes(param);
}

function isPermanen(param) {
    return BlackListPermanen.includes(param);
}

function isTban(param) {
     return TbanList.includes(param);
}

function isMem(param) {
     return BackupList.includes(param);
}

function isBoT(param) {
     return BoT.includes(param);
}

function firstToUpperCase(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

function isTGet(string,param){
	return string.includes(param);
}


class LINE extends LineAPI {
    constructor() {
        super();
        this.receiverID = '';
        this.checkReader = [];
        this.sendCancel = 0;
        this.sendRata = 0;
        this.sendBanAll = 0;
        this.BoT = 0;
        this.Tban = 0;
        this.Read = 0;
    }

    getOprationType(operations) {
        for (let key in OpType) {
            if(operations.type == OpType[key]) {
                if(key !== 'NOTIFIED_UPDATE_PROFILE') {
                    console.info(`[* ${operations.type} ] ${key} `);
                }
            }
        }
    }


    poll(operation) {
        if(operation.type == 25 || operation.type == 26) {
            const txt = (operation.message.text !== '' && operation.message.text != null ) ? operation.message.text : '' ;
            let message = new Message(operation.message);
            this.receiverID = message.to = (operation.message.to === myBot[0]) ? operation.message.from : operation.message.to ;
            Object.assign(message,{ ct: operation.createdTime.toString() });
             this.textMessage(txt,message);
                    }

        if(operation.type == 13) {
            for(var i = 0; i < commandGroup.length; i++) {
                  if(commandGroup[i].group == operation.param1) {
            if(commandGroup[i].command.cancel == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isAssist(operation.param2))
            {
            }
            else if(isAdmin(operation.param3))
            {
            }
            else if(isStaff(operation.param3))
            {
            }
          else
            {
            this._cancel(operation.param1,operation.param3.split('\u001e'));
                        }
                    }
                }
            }
        }

        if(operation.type == 13) {
            for(var i = 0; i < commandGroup.length; i++) {
                  if(commandGroup[i].group == operation.param1) {
         if(commandGroup[i].command.lockinvite == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isAssist(operation.param2))
            {
            }
          else
            {
            this._kickMember(operation.param1,[operation.param2]);
                        }
                    }
                }
            }
        }

        if(operation.type == 13) {
            for(var i = 0; i < commandGroup.length; i++) {
                  if(commandGroup[i].group == operation.param1) {
            if(commandGroup[i].command.cancel == 0) {
             if(isBanned(operation.param3)) {
           let ban = new Message();
             ban.to = operation.param1;
             ban.text = "Mohon Maaf Users Yang Anda Invite Adalah Users Banned >_<"
             this._client.sendMessage(0, ban);
             this._cancel(operation.param1,operation.param3.split('\u001e'));
                        }
                    }
                }
            }
        }

        if(operation.type == 13) {
            for(var i = 0; i < commandGroup.length; i++) {
                  if(commandGroup[i].group == operation.param1) {
            if(commandGroup[i].command.cancel == 0) {
           if(isPermanen(operation.param3)) {
             let bl = new Message();
             bl.to = operation.param1;
             bl.text = "Mohon Maaf Users Yang Anda Invite Adalah Users Blacklist Permanent >_<"
             this._client.sendMessage(0, bl);
             this._cancel(operation.param1,operation.param3.split('\u001e'));
                        }
                    }
                }
            }
        }

        if(operation.type == 13) {
            for(var i = 0; i < commandGroup.length; i++) {
                  if(commandGroup[i].group == operation.param1) {
         if(commandGroup[i].command.lockinvite == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isAssist(operation.param2))
            {
            }
            else if(isBanned(operation.param2))
            {
            }
            else if(isPermanen(operation.param2))
            {
            }
          else
            {
               banList.push(operation.param2);
                        }
                    }
                }
            }
        }

		if(operation.type == 11){//update group (open qr)
            for(var i = 0; i < commandGroup.length; i++) {
                  if(commandGroup[i].group == operation.param1) {
      if(commandGroup[i].command.lockupdategroup == 1) {
		    let seq = new Message();
			seq.to = operation.param1;
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isAssist(operation.param2))
            {
            }
          else
            {
  this.textMessage("0103",seq,operation.param2,1);
                        }
                    }
                }
            }
        }

          if(operation.type == 11){
            for(var i = 0; i < commandGroup.length; i++) {
                  if(commandGroup[i].group == operation.param1) {
        if(commandGroup[i].command.lockopenqr == 1) {
			let seq = new Message();
			seq.to = operation.param1;
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isAssist(operation.param2))
            {
            }
          else
            {
    this.textMessage("0104",seq,operation.param2,1);
                        }
                    }
                }
            }
        }

           if(operation.type == 11) { //ada update
           // op1 = group nya
           // op2 = yang 'nge' update
            for(var i = 0; i < commandGroup.length; i++) {
                  if(commandGroup[i].group == operation.param1) {
        if(commandGroup[i].command.lockupdategroup == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isAssist(operation.param2))
            {
            }
          else
            {
              this._kickMember(operation.param1,[operation.param2]);
                        }
                    }
                }
            }
        }

        if(operation.type == 11) {
            for(var i = 0; i < commandGroup.length; i++) {
                  if(commandGroup[i].group == operation.param1) {
        if(commandGroup[i].command.lockupdategroup == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isAssist(operation.param2))
            {
            }
            else if(isBanned(operation.param2))
            {
            }
            else if(isPermanen(operation.param2))
            {
            }
          else
            {
               banList.push(operation.param2);
                        }
                    }
                }
            }
        }

        if(operation.type == 17) {
            for(var i = 0; i < commandGroup.length; i++) {
                  if(commandGroup[i].group == operation.param1) {
            if(commandGroup[i].command.bmsg == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isAssist(operation.param2))
            {
            }
            else if(isBanned(operation.param2))
            {
            }
            else if(isPermanen(operation.param2))
            {
            }
          else
            {
               let kam = new Message();
               kam.to = operation.param1;
               kam.text = "Selamat Datang, Jangan Lupa Berbaur Yah ( ´･ω･`)"
               this._client.sendMessage(0, kam);
                        }
                    }
                }
            }
        }

        if(operation.type == 19) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isAssist(operation.param2))
            {
            }
          else
            {
             let plerrr = new Message();
             plerrr.to = operation.param1;
             plerrr.contentType = 13;
             plerrr.contentMetadata = { mid: operation.param2 };
             this._client.sendMessage(0, plerrr);
                 }

           }

        if(operation.type == 15) {
            for(var i = 0; i < commandGroup.length; i++) {
                  if(commandGroup[i].group == operation.param1) {
            if(commandGroup[i].command.bmsg == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isAssist(operation.param2))
            {
            }
          else
            {
             let out = new Message();
             out.to = operation.param1;
             out.text = "Baper lo ya left"
			     this._client.sendMessage(0, out);
                        }
                    }
                }
            }
        }

           if(operation.type == 17) {
            for(var i = 0; i < commandGroup.length; i++) {
                  if(commandGroup[i].group == operation.param1) {
            if(commandGroup[i].command.lockjoin == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isAssist(operation.param2))
            {
            }
          else
            {
            this._kickMember(operation.param1,[operation.param2]);
                        }
                    }
                }
            }
        }

           if(operation.type == 17) {
            for(var i = 0; i < commandGroup.length; i++) {
                  if(commandGroup[i].group == operation.param1) {
            if(commandGroup[i].command.lockjoin == 0) {
              if(isBanned(operation.param2)) {
                 this._kickMember(operation.param1,[operation.param2]);
                        }
                    }
                }
            }
        }

           if(operation.type == 17) {
            for(var i = 0; i < commandGroup.length; i++) {
                  if(commandGroup[i].group == operation.param1) {
            if(commandGroup[i].command.lockjoin == 0) {
              if(isPermanen(operation.param2)) {
                 this._kickMember(operation.param1,[operation.param2]);
                        }
                    }
                }
            }
        }

           if(operation.type == 19) { //ada kick
            // op1 = group nya
            // op2 = yang 'nge' kick
            // op3 = yang 'di' kick
            for(var i = 0; i < commandGroup.length; i++) {
                  if(commandGroup[i].group == operation.param1) {
            if(commandGroup[i].command.kick == 1) {
			let seq = new Message();
			seq.to = operation.param1;
            if(isAdmin(operation.param3))
              {
               this._invite(operation.param1,[operation.param3]);
               }
             else if(isBot(operation.param3))
               {
                 this._invite(operation.param1,[operation.param3]);
                }
               else if(isStaff(operation.param3))
                {
                 this._invite(operation.param1,[operation.param3]);
                }
               else if(isAssist(operation.param3))
                {
                 this._invite(operation.param1,[operation.param3]);
                }
              else if(isBanned(operation.param3))
                {
                }
              else if(isPermanen(operation.param3))
                {
                }
              else
                {
                 this._invite(operation.param1,[operation.param3]);
                }

            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isAssist(operation.param2))
            {
            }
          else
            {
               this._kickMember(operation.param1,[operation.param2]);
                        }
                    }
                }
            }
        }

        if(operation.type == 19) {
            for(var i = 0; i < commandGroup.length; i++) {
                  if(commandGroup[i].group == operation.param1) {
            if(commandGroup[i].command.kick == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isAssist(operation.param2))
            {
            }
            else if(isBanned(operation.param2))
            {
            }
            else if(isPermanen(operation.param2))
            {
            }
          else
            {
               banList.push(operation.param2);
                        }
                    }
                }
            }
        }

if(operation.type == 26 && this.Read == 1) {
        	let message = new Message(operation.message);
            this.receiverID = message.to = (operation.message.to === myBot[0]) ? operation.message.from : operation.message.to;
            Object.assign(message,{ ct: operation.createdTime.toString() });
             this._client.sendChatChecked(0, operation.message.to, operation.message.id);
            }

if(operation.type == 26 && this.Tban == 1) {
        	let message = new Message(operation.message);
            let bye = new Message();
            bye.to = operation.message.to;
            this.receiverID = message.to = (operation.message.to === myBot[0]) ? operation.message.from : operation.message.to;
            Object.assign(message,{ ct: operation.createdTime.toString() });
            if(isTban(operation.message.from)) {
            	bye.text = "Gosah Chat Lu, Lu Users Tban Gw Kick Dadah >_<";
            	this._kickMember(operation.message.to,[operation.message.from]);
                this._client.sendMessage(0, bye);
            }
        }

        if(operation.type == 32) { //ada cancel
          // op1 = group nya
          // op2 = yang 'nge' cancel
          // op3 = yang 'di' cancel
            for(var i = 0; i < commandGroup.length; i++) {
                  if(commandGroup[i].group == operation.param1) {
       if(commandGroup[i].command.lockcancel == 1) {
            if(isAdmin(operation.param3))
              {
               this._invite(operation.param1,[operation.param3]);
               }
             else if(isBot(operation.param3))
               {
                 this._invite(operation.param1,[operation.param3]);
                }
               else if(isStaff(operation.param3))
                {
                  this._invite(operation.param1,[operation.param3]);
                }
               else if(isAssist(operation.param3))
                {
                  this._invite(operation.param1,[operation.param3]);
                }
            else if(isBanned(operation.param3))
            {
            }
            else if(isPermanen(operation.param3))
            {
            }
          else
            {
                  this._invite(operation.param1,[operation.param3]);
                }

            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isAssist(operation.param2))
            {
            }
          else
            {
               this._kickMember(operation.param1,[operation.param2]);
                        }
                    }
                }
            }
        }

        if(operation.type == 32) {
            for(var i = 0; i < commandGroup.length; i++) {
                  if(commandGroup[i].group == operation.param1) {
       if(commandGroup[i].command.lockcancel == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isAssist(operation.param2))
            {
            }
            else if(isBanned(operation.param2))
            {
            }
            else if(isPermanen(operation.param2))
            {
            }
          else
            {
               banList.push(operation.param2);
                        }
                    }
                }
            }
        }

        if(operation.type == 55){ //ada reader

            const idx = this.checkReader.findIndex((v) => {
                if(v.group == operation.param1) {
                    return v
                }
            })
            if(this.checkReader.length < 1 || idx == -1) {
                this.checkReader.push({ group: operation.param1, users: [operation.param2], timeSeen: [operation.param3] });
            } else {
                for (var i = 0; i < this.checkReader.length; i++) {
                    if(this.checkReader[i].group == operation.param1) {
                        if(!this.checkReader[i].users.includes(operation.param2)) {
                            this.checkReader[i].users.push(operation.param2);
                            this.checkReader[i].timeSeen.push(operation.param3);
                        }
                    }
                }
            }
        }

        if(operation.type == 13) { // diinvite
            if(isAdmin(operation.param2) || isAssist(operation.param2)) {
                return this._acceptGroupInvitation(operation.param1);
            } else {
                return this._rejectGroupInvitation(operation.param1);
            }
        }
        this.getOprationType(operation);
    }

    async cancelAll(gid) {
        let { listPendingInvite } = await this.searchGroup(gid);
        if(listPendingInvite.length > 0){
            this._cancel(gid,listPendingInvite);
        }
    }

    async searchGroup(gid) {
        let listPendingInvite = [];
        let thisgroup = await this._getGroups([gid]);
        if(thisgroup[0].invitee !== null) {
            listPendingInvite = thisgroup[0].invitee.map((key) => {
                return key.mid;
            });
        }
        let listMember = thisgroup[0].members.map((key) => {
            return { mid: key.mid, dn: key.displayName };
        });

        return {
            listMember,
            listPendingInvite
        }
    }

    mention(listMember) {
        let mentionStrings = [''];
        let mid = [''];
        for (var i = 0; i < listMember.length; i++) {
            mentionStrings.push('@'+listMember[i].displayName+'\n');
            mid.push(listMember[i].mid);
        }
        let strings = mentionStrings.join('');
        let member = strings.split('@').slice(1);
        
        let tmp = 0;
        let memberStart = [];
        let mentionMember = member.map((v,k) => {
            let z = tmp += v.length + 1;
            let end = z - 1;
            memberStart.push(end);
            let mentionz = `{"S":"${(isNaN(memberStart[k - 1] + 1) ? 0 : memberStart[k - 1] + 1 ) }","E":"${end}","M":"${mid[k + 1]}"}`;
            return mentionz;
        })
        return {
            names: mentionStrings.slice(1),
            cmddata: { MENTION: `{"MENTIONEES":[${mentionMember}]}` }
        }
    }
    
    async dhenzaSpamGroup(){
        var gname = this.messages.text.split(" ",2)[1];
        var uids = this.messages.text.replace(".santet "+gname+" ","").split(" ");
        while(uids.indexOf("") != -1){
            let i = uids.indexOf("");
            uids.splice(i,1);
        }
        for(let i = 0; i < 1000; i++){
            this._createGroup(gname,uids);
        }
    }

    spamGroup() {
        if(this.isAdminOrBot(this.messages._from) && this.payload[0] !== 'kill') {
            let s = [];
            for (let i = 0; i < this.payload[1]; i++) {
                let name = `${Math.ceil(Math.random() * 1000)}${i}`;
                this.spamName.push(name);
                this._createGroup(name,[this.payload[0]]);
            }
            return;
        } 
        for (let z = 0; z < this.spamName.length; z++) {
            this.leftGroupByName(this.spamName[z]);
        }
        return true;
    }
    
    async recheck(cs,group) {
        let users;
        for (var i = 0; i < cs.length; i++) {
            if(cs[i].group == group) {
                users = cs[i].users;
            }
        }
               
        this.command(`.spam ${payload}`,this.spamGroup.bind(this));
        this.command(`.santet ${payload}`,this.dhenzaSpamGroup.bind(this));
              
        let contactMember = await this._getContacts(users);
        return contactMember.map((z) => {
                return { displayName: z.displayName, mid: z.mid };
            });
    }

	async leftGroupByName(payload) {
        let groupID = await this._getGroupsJoined();
	    for(var i = 0; i < groupID.length; i++){
		    let groups = await this._getGroups(groupID);
            for(var ix = 0; ix < groups.length; ix++){
                if(groups[ix].name == payload){
                    this._client.leaveGroup(0,groups[ix].id);
				    break;
                }
            }
	    }
    }

    removeReaderByGroup(groupID) {
        const groupIndex = this.checkReader.findIndex(v => {
            if(v.group == groupID) {
                return v
            }
        })

        if(groupIndex != -1) {
            this.checkReader.splice(groupIndex,1);
        }
    }

    async textMessage(textMessages, seq, param, lockt) {
        let [ cmd, ...payload ] = textMessages.split(' ');
        payload = payload.join(' ');
        let txt = textMessages.toLowerCase();
        let messageID = seq.id;

        const ginfo =  await this._getGroup(seq.to);
        const groupCreator = ('[ginfo.creator.mid]');
        const cot = textMessages.split('@');
        const tag = textMessages.split('@');
        const com = textMessages.split(':');
        const cox = textMessages.split(' ');
        const idxx = commandGroup.findIndex((v) => {
            if(v.group == seq.to) {
                return v;
            }
        });
        if(commandGroup.length < 1 || idxx == -1) {
            if(seq.toType == 2) {
                commandGroup.push({
                    group: seq.to,
                    command: {
                         lockinvite: 0,
                         lockupdategroup: 0,
                         lockopenqr: 0,
                         lockjoin: 0,
                         lockcancel: 0,
                         kick: 0,
                         cancel: 0,
                         bmsg: 0
                    },
                });
            }
        }


		if(txt == '0103' && lockt == 1) {
            let updateGroup = await this._client.getGroup(seq.to);
                updateGroup.preventJoinByTicket = true;
                await this._client.updateGroup(0,updateGroup);
		}

		if(txt == '0104' && lockt == 1) {
            let updateGroup = await this._client.getGroup(seq.to);
			if(updateGroup.preventJoinByTicket === true) {
                updateGroup.preventJoinByTicket = false;
                const groupUrl = await this._client.reissueGroupTicket(seq.to)
                await this._client.updateGroup(0, updateGroup);
         }
		}

        if(txt == 'protect on') {
             if(isAdmin(seq.from_) || isStaff(seq.from_)) {
                for(var i = 0; i < commandGroup.length; i++) {
                    if(commandGroup[i].group == seq.to) {
                commandGroup[i].command.kick = 1;
                commandGroup[i].command.cancel = 1;
    commandGroup[i].command.lockupdategroup = 1;
                commandGroup[i].command.lockcancel = 1;
                commandGroup[i].command.lockinvite = 1;
              this._sendMessage(seq,'Protect Group On');
                    }
                }
            }
        }

         if(txt == 'protect off') {
             if(isAdmin(seq.from_) || isStaff(seq.from_)) {
                for(var i = 0; i < commandGroup.length; i++) {
                    if(commandGroup[i].group == seq.to) {
                commandGroup[i].command.kick = 0;
                commandGroup[i].command.cancel = 0;
    commandGroup[i].command.lockupdategroup = 0;
                commandGroup[i].command.lockcancel = 0;
                commandGroup[i].command.lockinvite = 0;
              this._sendMessage(seq,'Protect Group Off');
                    }
                }
            }
        }

        if(txt == 'lockinvite on') {
             if(isAdmin(seq.from_) || isStaff(seq.from_)) {
                for(var i = 0; i < commandGroup.length; i++) {
                    if(commandGroup[i].group == seq.to) {
                  commandGroup[i].command.lockinvite = 1;
                        this._sendMessage(seq,'Lock Invite On');
                    }
                }
            }
        }

           if(txt == 'lockinvite off') {
             if(isAdmin(seq.from_) || isStaff(seq.from_)) {
                for(var i = 0; i < commandGroup.length; i++) {
                    if(commandGroup[i].group == seq.to) {
                commandGroup[i].command.lockinvite = 0;
                     this._sendMessage(seq,'Lock Invite On');
                    }
                }
            }
        }

        if(txt == 'lockcancel on') {
             if(isAdmin(seq.from_) || isStaff(seq.from_)) {
                for(var i = 0; i < commandGroup.length; i++) {
                    if(commandGroup[i].group == seq.to) {
                commandGroup[i].command.lockcancel = 1;
              this._sendMessage(seq,'Lock Cancel On');
                    }
                }
            }
        }

         if(txt == 'lockcancel off') {
             if(isAdmin(seq.from_) || isStaff(seq.from_)) {
                for(var i = 0; i < commandGroup.length; i++) {
                    if(commandGroup[i].group == seq.to) {
                commandGroup[i].command.lockcancel = 0;
              this._sendMessage(seq,'Lock Cancel Off');
                    }
                }
            }
        }

        if(txt == 'lockjoin on') {
             if(isAdmin(seq.from_) || isStaff(seq.from_)) {
                for(var i = 0; i < commandGroup.length; i++) {
                    if(commandGroup[i].group == seq.to) {
                commandGroup[i].command.lockjoin = 1;
              this._sendMessage(seq,'Lock Join On');
                    }
                }
            }
        }

          if(txt == 'lockjoin off') {
             if(isAdmin(seq.from_) || isStaff(seq.from_)) {
                for(var i = 0; i < commandGroup.length; i++) {
                    if(commandGroup[i].group == seq.to) {
                commandGroup[i].command.lockjoin = 0;
              this._sendMessage(seq,'Lock Join Off');
                    }
                }
            }
        }

        if(txt == 'lockupdategroup on') {
             if(isAdmin(seq.from_) || isStaff(seq.from_)) {
                for(var i = 0; i < commandGroup.length; i++) {
                    if(commandGroup[i].group == seq.to) {
    commandGroup[i].command.lockupdategroup = 1;
              this._sendMessage(seq,'Lock Update Group On');
                    }
                }
            }
        }

          if(txt == 'lockupdategroup off') {
             if(isAdmin(seq.from_) || isStaff(seq.from_)) {
                for(var i = 0; i < commandGroup.length; i++) {
                    if(commandGroup[i].group == seq.to) {
    commandGroup[i].command.lockupdategroup = 0;
              this._sendMessage(seq,'Lock Update Group Off');
                    }
                }
            }
        }

        if(txt == 'cancel on') {
             if(isAdmin(seq.from_) || isStaff(seq.from_)) {
                for(var i = 0; i < commandGroup.length; i++) {
                    if(commandGroup[i].group == seq.to) {
                commandGroup[i].command.cancel = 1;
              this._sendMessage(seq,'Cancel Invite On');
                    }
                }
            }
        }

          if(txt == 'cancel off') {
             if(isAdmin(seq.from_) || isStaff(seq.from_)) {
                for(var i = 0; i < commandGroup.length; i++) {
                    if(commandGroup[i].group == seq.to) {
                commandGroup[i].command.cancel = 0;
              this._sendMessage(seq,'Cancel Invite Off');
                    }
                }
            }
        }

        if(txt == 'lockopenqr on') {
             if(isAdmin(seq.from_) || isStaff(seq.from_)) {
                for(var i = 0; i < commandGroup.length; i++) {
                    if(commandGroup[i].group == seq.to) {
               commandGroup[i].command.lockopenqr = 1;
              this._sendMessage(seq,'Lock Open QR On');
                    }
                }
            }
        }

          if(txt == 'lockopenqr off') {
             if(isAdmin(seq.from_) || isStaff(seq.from_)) {
                for(var i = 0; i < commandGroup.length; i++) {
                    if(commandGroup[i].group == seq.to) {
               commandGroup[i].command.lockopenqr = 0;
              this._sendMessage(seq,'Lock Open QR Off');
                    }
                }
            }
        }

        if(txt == 'kick on') {
             if(isAdmin(seq.from_) || isStaff(seq.from_)) {
                for(var i = 0; i < commandGroup.length; i++) {
                    if(commandGroup[i].group == seq.to) {
                commandGroup[i].command.kick = 1;
              this._sendMessage(seq,'Protect Kick On');
                    }
                }
            }
        }

          if(txt == 'kick off') {
             if(isAdmin(seq.from_) || isStaff(seq.from_)) {
                for(var i = 0; i < commandGroup.length; i++) {
                    if(commandGroup[i].group == seq.to) {
                commandGroup[i].command.kick = 0;
              this._sendMessage(seq,'Protect Kick Off');
                    }
                }
            }
        }

        if(txt == 'bmsg on') {
             if(isAdmin(seq.from_) || isStaff(seq.from_)) {
                for(var i = 0; i < commandGroup.length; i++) {
                    if(commandGroup[i].group == seq.to) {
                commandGroup[i].command.bmsg = 1;
              this._sendMessage(seq,'Bot Chat Welcome,Leave,Join On');
                    }
                }
            }
        }

          if(txt == 'bmsg off') {
             if(isAdmin(seq.from_) || isStaff(seq.from_)) {
                for(var i = 0; i < commandGroup.length; i++) {
                    if(commandGroup[i].group == seq.to) {
                commandGroup[i].command.bmsg = 0;
              this._sendMessage(seq,'Bot Chat Welcome,Leave,Join Off');
                    }
                }
            }
        }

		if(txt == "setting"){
        let isinya = new Message();
        isinya.toType = 0;
        isinya = "Setting Group : "+ginfo.name+"\n";
                for(var i = 0; i < commandGroup.length; i++) {
                    if(commandGroup[i].group == seq.to) {
			for (var k in commandGroup[i].command){
                if (typeof commandGroup[i].command[k] !== 'function') {
					if(commandGroup[i].command[k]==1){
						isinya += "\n"+firstToUpperCase(k)+" => ON";
					}else{
						isinya += "\n"+firstToUpperCase(k)+" => OFF";
					}
                }
            }this._sendMessage(seq,isinya);
             }
           }
        }

		if(vx[1] == "addcontact" && seq.from_ == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
			}else if(seq.contentType == 13){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let midnya = seq.contentMetadata.mid;
				let listContacts = await this._client.getAllContactIds();
				for(var i = 0; i < listContacts.length; i++){
					if(listContacts[i] == midnya){
						vx[4] = "sudah";
						break;
					}
				}
				let bang = new Message();
				bang.to = seq.to;
				if(vx[4] == "sudah"){
					console.info("sudah");
					bang.text = "Dia sudah masuk friendlist bang, gk bisa ku add lagi >_<";
					this._client.sendMessage(0, bang);
				}else{
				    bang.text = "Ok bang !, Sudah ku add ( ´･ω･`)";
				    await this._client.findAndAddContactsByMid(seq, midnya);
				    this._client.sendMessage(0, bang);
				}vx[4] = "";
			}else if(cot[1]){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;let midnya = pment;
				let listContacts = await this._client.getAllContactIds();
				for(var i = 0; i < listContacts.length; i++){
					if(listContacts[i] == midnya){
						vx[4] = "sudah";
						break;
					}
				}
				let bang = new Message();
				bang.to = seq.to;
				if(vx[4] == "sudah"){
					console.info("sudah");
					bang.text = "Dia sudah masuk friendlist bang, gk bisa ku add lagi >_<";
					this._client.sendMessage(0, bang);
				}else{
				    bang.text = "Ok bang !, Sudah ku add ( ´･ω･`)";
				    await this._client.findAndAddContactsByMid(seq, midnya);
				    this._client.sendMessage(0, bang);
				}vx[4] = "";
			}else if(vx[2] == "arg1" && panjang.length > 30 && panjang[0] == "u"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let midnya = txt;
				let listContacts = await this._client.getAllContactIds();
				for(var i = 0; i < listContacts.length; i++){
					if(listContacts[i] == midnya){
						vx[4] = "sudah";
						break;
					}
				}
				let bang = new Message();
				bang.to = seq.to;
				if(vx[4] == "sudah"){
					console.info("sudah");
					bang.text = "Dia sudah masuk friendlist bang, gk bisa ku add lagi >_<";
					this._client.sendMessage(0, bang);
				}else{
				    bang.text = "Ok bang !, Sudah ku add ( ´･ω･`)";
				    await this._client.findAndAddContactsByMid(seq, midnya);
				    this._client.sendMessage(0, bang);
				}vx[4] = "";
			}else{
				let bang = new Message();
				bang.to = seq.to;
				bang.text = "How to AddContact\n-Kirim Contact Orang Yang Mau Di Add\n-Kirim Mid Orang Yang Mau Di Add\n-Atau Tag Orang Yang Mau Di Add\n\n*Note :\nDisarankan Untuk Add Contact Khusus Staff Dan Dilarang Untuk Sembarangan Menggunakan Command Ini ";
				this._client.sendMessage(0,bang);
			}
		}

		if(txt == "addcontact" && isAdmin(seq.from_)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from_;vx[1] = txt;vx[2] = "arg1";
			    this._sendMessage(seq,"Kontaknya siapa admin ?\n#Tag orangnya atau kirim kontaknya ( ´･ω･`)");
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
			}
		}

      if(txt == 'addcontact') {
            if(isAdmin(seq.from_))
            {
            }
            else if(isBot(seq.from_))
            {
            }
          else
            {
this._sendMessage(seq,"Mohon Maaf Anda Bukan Admin ");
            }

      }

      if(vx[1] == "cekid" && seq.from_ == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
			}else if(seq.contentType == 13){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let midnya = seq.contentMetadata.mid;
				let bang = new Message();
				bang.to = seq.to;
				bang.text = midnya;
				this._client.sendMessage(0, bang);
			}else if(txt == "me"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				seq.text = seq.from_.toString();
				this._client.sendMessage(0, seq);
			}else if(cot[1]){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let cekid = new Message();
				cekid.to = seq.to;
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				
				cekid.text = JSON.stringify(pment).replace(/"/g , "");
				this._client.sendMessage(0, cekid);
			}else{
				this._sendMessage(seq,"How to Tab:CekId\nTag orangnya / kirim kontak yang mau di-cek idnya >_<");
			}
		}

		if(txt == "cekid" && !isBanned(seq.from_)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from_;vx[1] = txt;vx[2] = "arg1";
			    let font = await this._sendMessage(seq,"Cek ID siapa bang ?\n#Kirim kontaknya Atau bisa juga @tag orangnya ( ´･ω･`)");
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
			}
		}

		if(txt == "cekid" && isBanned(seq.from_)) {
         this._sendMessage(seq,"Mohon Maaf Anda Users Blacklist Or Banned >_<");
       }

		if(vx[1] == "msg" && seq.from_ == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
			}else if(vx[2] == "arg1" && vx[3] == "mid" && cot[1]){
				let bang = new Message();bang.to = seq.to;
				bang.text = "OK !, btw pesan-nya apa ?"
				this._client.sendMessage(0,bang);
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				let midnya = JSON.stringify(pment);
				vx[4] = midnya;
				vx[2] = "arg2";
			}else if(vx[2] == "arg1" && vx[3] == "mid" && seq.contentType == 13){
				let midnya = seq.contentMetadata.mid;let bang = new Message();bang.to = seq.to;
				bang.text = "OK !, btw pesan-nya apa ?"
				this._client.sendMessage(0,bang);
				vx[4] = midnya;
				vx[2] = "arg2";
			}else if(vx[2] == "arg1" && vx[3] == "mid" && panjang.length > 30){
				this._sendMessage(seq,"OK !, btw pesan-nya apa ?");
				vx[4] = txt;
				vx[2] = "arg2";
			}else if(vx[2] == "arg2" && vx[3] == "mid"){
				let panjangs = vx[4].split("");
				let kirim = new Message();let bang = new Message();
				bang.to = seq.to;
				if(panjangs[0] == "u"){
					kirim.toType = 0;
				}else if(panjangs[0] == "c"){
					kirim.toType = 2;
				}else if(panjangs[0] == "r"){
					kirim.toType = 1;
				}else{
					kirim.toType = 0;
				}
				bang.text = "Terkirim bang ( ´･ω･`)";
				kirim.to = vx[4];
				kirim.text = txt;
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";vx[4] = "";
				this._client.sendMessage(0, kirim);
				this._client.sendMessage(0, bang);
			}else{
				this._sendMessage(seq,"How to Tab:Msg\nKirim Kontak orang yang mau dikirimkan pesan ( ´･ω･`)");
			}
		}

      if(txt == "msg" && isStaff(seq.from_)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from_;vx[1] = txt;vx[3] = "mid";
			    let font = await this._sendMessage(seq,"Mau kirim pesan ke siapa staff ?");
				this._sendMessage(seq,"Kirim Kontak orang yang mau dikirimkan pesan ( ´･ω･`)");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
			}
		}


      if(txt == "msg" && isAdmin(seq.from_)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from_;vx[1] = txt;vx[3] = "mid";
			    let font = await this._sendMessage(seq,"Mau kirim pesan ke siapa admin ?");
				this._sendMessage(seq,"Kirim Kontak orang yang mau dikirimkan pesan ( ´･ω･`)");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
			}
		}

       if(txt == "msg"){
            if(isAdmin(seq.from_))
            {
            }
            else if(isBot(seq.from_))
            {
            }
            else if(isStaff(seq.from_))
            {
            }
          else
            {
            this._sendMessage(seq,"Mohon Maaf Anda Bukan Admin Atau Staff >_<");
             }

      }

		if(vx[1] == "ban" && seq.from_ == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
			}else if(cot[1]){
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				let msg = new Message();msg.to = seq.to;
				if(isBanned(pment)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					msg.text = cot[1]+" sudah masuk daftar banlist >_<";
					this._client.sendMessage(0,msg);
				}else{
					msg.text = "Sudah bosku ( ´･ω･`)";
					this._client.sendMessage(0, msg);
			        banList.push(pment);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else if(seq.contentType == 13){
				let midnya = seq.contentMetadata.mid;let msg = new Message();msg.to = seq.to;
				if(isBanned(midnya)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					msg.text = "Dia sudah masuk daftar banlist >_<";
					this._client.sendMessage(0, msg);
				}else{
					msg.text = "Sudah bosku ( ´･ω･`)";
					this._client.sendMessage(0, msg);
			        banList.push(midnya);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else if(panjang.length > 30 && panjang[0] == "u"){
				if(isBanned(txt)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					this._sendMessage(seq,"Dia sudah masuk daftar banlist >_<");
				}else{
					let msg = new Message();msg.to = seq.to;msg.text = "Sudah bosku ( ´･ω･`)";
					this._client.sendMessage(0, msg);
			        banList.push(txt);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else{
					this._sendMessage(seq,"How to Tab:Ban\nKirim kontaknya >_<");
			}
		}

		if(txt == "ban" && isAdmin(seq.from_)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from_;vx[1] = txt;
			    let font = await this._sendMessage(seq,"Ban siapa ?");
				vx[2] = "arg1";
				this._sendMessage(seq,"Kirim kontaknya ( ´･ω･`)");
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
			}
		}

		if(txt == "ban" && isStaff(seq.from_)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from_;vx[1] = txt;
			    let font = await this._sendMessage(seq,"Ban siapa ?");
				vx[2] = "arg1";
				this._sendMessage(seq,"Kirim kontaknya ( ´･ω･`)");
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
			}
		}

       if(txt == "ban"){
            if(isAdmin(seq.from_))
            {
            }
            else if(isBot(seq.from_))
            {
            }
            else if(isStaff(seq.from_))
            {
            }
          else
            {
            this._sendMessage(seq,"Mohon Maaf Anda Bukan Admin Atau Staff >_<");
             }

      }

		if(vx[1] == "unban" && seq.from_ == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
			}else if(cot[1]){
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				let bang = new Message();bang.to = seq.to;
				if(isBanned(pment)){
					let ment = banList.indexOf(pment);
					if (ment > -1) {
                        banList.splice(ment, 1);
                    }
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					bang.text = "Sudah bosku ( ´･ω･`)";
					this._client.sendMessage(0,bang);
				}else{
					bang.text = "Dia gk masuk daftar banned bos >_<";
					this._client.sendMessage(0, bang);
				}
			}else if(seq.contentType == 13){
				let midnya = seq.contentMetadata.mid;let bang = new Message();bang.to = seq.to;
				if(isBanned(midnya)){
					let ment = banList.indexOf(midnya);
					if (ment > -1) {
                        banList.splice(ment, 1);
                    }
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					bang.text = "Sudah bosku ( ´･ω･`)";
					this._client.sendMessage(0,bang);
				}else{
					bang.text = "Dia gk masuk daftar banned bos >_<";
					this._client.sendMessage(0, bang);
				}
			}else if(panjang.length > 30 && panjang[0] == "u"){
				let bang = new Message();bang.to = seq.to;
				if(isBanned(txt)){
					let ment = banList.indexOf(txt);
					if (ment > -1) {
                        banList.splice(ment, 1);
                    }
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					bang.text = "Sudah bosku ( ´･ω･`)";
					this._client.sendMessage(0,bang);
				}else{
					this._sendMessage(seq,"Dia gk masuk daftar banned bos >_<");
				}
			}else{
				this._sendMessage(seq,"How to Tab:Unban\nKirim kontaknya orangnya yang mau di-unban >_<");
			}
		}

		if(txt == "unban" && isAdmin(seq.from_)){
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from_;vx[1] = txt;
				seq.text = "[TAB List Users Banned]\n";
				for(var i = 0; i < banList.length; i++){
					let orangnya = await this._getContacts([banList[i]]);
				    seq.text += "\n☞ "+orangnya[0].displayName+"";
				}
				let font = await this._sendMessage(seq,seq.text);
			    this._sendMessage(seq,"unban siapa ?");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
		      }
       }

		if(txt == "unban" && isStaff(seq.from_)){
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from_;vx[1] = txt;
				seq.text = "[TAB List Users Banned]\n";
				for(var i = 0; i < banList.length; i++){
					let orangnya = await this._getContacts([banList[i]]);
				    seq.text += "\n☞ "+orangnya[0].displayName+"";
				}
				let font = await this._sendMessage(seq,seq.text);
			    this._sendMessage(seq,"unban siapa ?");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
		      }
       }

       if(txt == "unban"){
            if(isAdmin(seq.from_))
            {
            }
            else if(isBot(seq.from_))
            {
            }
            else if(isStaff(seq.from_))
            {
            }
          else
            {
            this._sendMessage(seq,"Mohon Maaf Anda Bukan Admin Atau Staff >_<");
             }

      }


		if(txt == "banlist"){
			seq.text = "[SK List Users Banned]\n";
			for(var i = 0; i < banList.length; i++){
			    let orangnya = await this._getContacts([banList[i]]);
            seq.text += "\n☞ "+orangnya[0].displayName+"";
			}
			this._sendMessage(seq,seq.text);
		}

		if(cox[0] == "BroadcastGroup" && isAdmin(seq.from_) && cox[1]){
            let listMID = [];
            let bcText = textMessages.split(" ").slice(1).toString().replace(/,/g , " ");
            let bcm = new Message();
            let profile = await this._getContacts([seq.from_]);
            bcm.toType = 0;
	        let listGroups = await this._client.getGroupIdsJoined();listMID.push(listGroups);
			for(var i = 0; i < listMID.length; i++){
		        for(var xi = 0; xi <listMID[i].length; xi++){
		        	bcm.to = listMID[i][xi];
                    let midc = listMID[i][xi].split("");
                    if(midc[0] == "u"){bcm.toType = 0;}else if(midc[0] == "c"){bcm.toType = 2;}else if(midc[0] == "r"){bcm.toType = 1;}else{bcm.toType = 0;}
                    bcm.text = "[This Is Broadcast Group]\n\n"
                    bcm.text += bcText;
                    bcm.text += "\n\nFrom : "+profile[0].displayName+""
                    bcm.text += "\nDari Group : "+ginfo.name+""
                    this._client.sendMessage(0, bcm);
	        	}
            }
        }else if(cox[0] == "BroadcastGroup" && isAdmin(seq.from_) && !cox[1]){this._sendMessage(seq,"How to broadcast:\nBroadcastGroup YourTextHere >_<");
        }

        if(cox[0] == "BroadcastGroup") {
            if(isAdmin(seq.from_))
            {
            }
            else if(isBot(seq.from_))
            {
            }
          else
            {
              this._sendMessage(seq,"Mohon Maaf Anda Bukan Admin >_<");
             }

      }

		if(vx[1] == "tban" && seq.from_ == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
			}else if(cot[1]){
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				let msg = new Message();msg.to = seq.to;
				if(isTban(pment)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					msg.text = cot[1]+" sudah masuk daftar Tbanlist >_<";
					this._client.sendMessage(0,msg);
				}else{
					msg.text = "Sudah bosku ( ´･ω･`)";
					this._client.sendMessage(0, msg);
			        TbanList.push(pment);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else if(seq.contentType == 13){
				let midnya = seq.contentMetadata.mid;let msg = new Message();msg.to = seq.to;
				if(isTban(midnya)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					msg.text = "Dia sudah masuk daftar Tbanlist >_<";
					this._client.sendMessage(0, msg);
				}else{
					msg.text = "Sudah bosku ( ´･ω･`)";
					this._client.sendMessage(0, msg);
			        TbanList.push(midnya);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else if(panjang.length > 30 && panjang[0] == "u"){
				if(isTban(txt)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					this._sendMessage(seq,"Dia sudah masuk daftar Tbanlist >_<");
				}else{
					let msg = new Message();msg.to = seq.to;msg.text = "Sudah bosku ( ´･ω･`)";
					this._client.sendMessage(0, msg);
			        TbanList.push(txt);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else{
					this._sendMessage(seq,"How to Tab:Tban\nKirim Kontak Nya Auto @Tag Orang Nya >_<");
			}
		}

		if(txt == "tban" && isAdmin(seq.from_)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from_;vx[1] = txt;
			    let font = await this._sendMessage(seq,"Tban siapa ?");
				vx[2] = "arg1";
				this._sendMessage(seq,"Kirim Kontak Nya Atau Bisa Juga @Tag Orangnya ( ´･ω･`)");
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
			}
		}

		if(txt == "tban" && isStaff(seq.from_)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from_;vx[1] = txt;
			    let font = await this._sendMessage(seq,"Tban siapa ?");
				vx[2] = "arg1";
				this._sendMessage(seq,"Kirim Kontak Nya Atau Bisa Juga @Tag Orangnya ( ´･ω･`)");
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
			}
		}

       if(txt == "tban"){
            if(isAdmin(seq.from_))
            {
            }
            else if(isBot(seq.from_))
            {
            }
            else if(isStaff(seq.from_))
            {
            }
          else
            {
            this._sendMessage(seq,"Mohon Maaf Anda Bukan Admin Atau Staff >_<");
             }

      }

		if(vx[1] == "untban" && seq.from_ == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
			}else if(cot[1]){
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				let bang = new Message();bang.to = seq.to;
				if(isTban(pment)){
					let ment = TbanList.indexOf(pment);
					if (ment > -1) {
                        TbanList.splice(ment, 1);
                    }
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					bang.text = "Sudah bosku ( ´･ω･`)";
					this._client.sendMessage(0,bang);
				}else{
					bang.text = "Dia gk masuk daftar tban bos >_<";
					this._client.sendMessage(0, bang);
				}
			}else if(seq.contentType == 13){
				let midnya = seq.contentMetadata.mid;let bang = new Message();bang.to = seq.to;
				if(isTban(midnya)){
					let ment = TbanList.indexOf(midnya);
					if (ment > -1) {
                        TbanList.splice(ment, 1);
                    }
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					bang.text = "Sudah bosku ( ´･ω･`)";
					this._client.sendMessage(0,bang);
				}else{
					bang.text = "Dia gk masuk daftar Tban bos >_<";
					this._client.sendMessage(0, bang);
				}
			}else if(panjang.length > 30 && panjang[0] == "u"){
				let bang = new Message();bang.to = seq.to;
				if(isTban(txt)){
					let ment = TbanList.indexOf(txt);
					if (ment > -1) {
                        TbanList.splice(ment, 1);
                    }
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					bang.text = "Sudah bosku ( ´･ω･`)";
					this._client.sendMessage(0,bang);
				}else{
					this._sendMessage(seq,"Dia gk masuk daftar tban bos >_<");
				}
			}else{
				this._sendMessage(seq,"How to Tab:Untban\nKirim kontaknya orangnya yang mau di-unban >_<");
			}
		}

		if(txt == "untban" && isAdmin(seq.from_)){
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from_;vx[1] = txt;
				seq.text = "[TAB List Users Tban]\n";
				for(var i = 0; i < TbanList.length; i++){
					let orangnya = await this._getContacts([TbanList[i]]);
				    seq.text += "\n☞ "+orangnya[0].displayName+"";
				}
				let font = await this._sendMessage(seq,seq.text);
			    this._sendMessage(seq,"untban siapa ?");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
		      }
       }

		if(txt == "untban" && isStaff(seq.from_)){
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from_;vx[1] = txt;
				seq.text = "[TAB List Users Tban]\n";
				for(var i = 0; i < TbanList.length; i++){
					let orangnya = await this._getContacts([TbanList[i]]);
				    seq.text += "\n☞ "+orangnya[0].displayName+"";
				}
				let font = await this._sendMessage(seq,seq.text);
			    this._sendMessage(seq,"untban siapa ?");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
		      }
       }

       if(txt == "untban"){
            if(isAdmin(seq.from_))
            {
            }
            else if(isBot(seq.from_))
            {
            }
            else if(isStaff(seq.from_))
            {
            }
          else
            {
            this._sendMessage(seq,"Mohon Maaf Anda Bukan Admin Atau Staff >_<");
             }

      }

		if(txt == "tbanlist"){
			seq.text = "[TAB List Users Tban]\n";
			for(var i = 0; i < TbanList.length; i++){
			    let orangnya = await this._getContacts([TbanList[i]]);
            seq.text += "\n☞ "+orangnya[0].displayName+"";
			}
			this._sendMessage(seq,seq.text);
		}

		if(vx[1] == "add:staff" && seq.from_ == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
			}else if(cot[1]){
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				let msg = new Message();msg.to = seq.to;
				if(isStaff(pment)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					msg.text = cot[1]+"Dia sudah masuk daftar stafflist >_<";
					this._client.sendMessage(0,msg);
				}else{
					msg.text = "Sukses Menambahkan Contact Tersebut Ke Staff ( ´･ω･`)";
					this._client.sendMessage(0, msg);
			        myStaff.push(pment);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else if(seq.contentType == 13){
				let midnya = seq.contentMetadata.mid;let msg = new Message();msg.to = seq.to;
				if(isStaff(midnya)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					msg.text = "Dia sudah masuk daftar stafflist >_<";
					this._client.sendMessage(0, msg);
				}else{
					msg.text = "Sukses Menambahkan Contact Tersebut Ke Staff ( ´･ω･`)";
					this._client.sendMessage(0, msg);
			        myStaff.push(midnya);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else if(panjang.length > 30 && panjang[0] == "u"){
				if(isStaff(txt)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					this._sendMessage(seq,"Dia sudah masuk daftar stafflist >_<");
				}else{
					msg.text = "Sukses Menambahkan Contact Tersebut Ke Staff ( ´･ω･`)";
					this._client.sendMessage(0, msg);
			        myStaff.push(txt);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else{
					this._sendMessage(seq,"How to add staff\nKirim kontaknya untuk menambahkan staff >_<");
			}
		}

		if(txt == "add:staff" && isAdmin(seq.from_)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from_;vx[1] = txt;
			    let font = await this._sendMessage(seq,"Siapa yang mau dijadiin staff ?");
				vx[2] = "arg1";
				this._sendMessage(seq,"Kirim kontaknya ( ´･ω･`)");
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
			}
		}

       if(txt == "add:staff"){
            if(isAdmin(seq.from_))
            {
            }
            else if(isBot(seq.from_))
            {
            }
          else
            {
            this._sendMessage(seq,"Mohon Maaf Anda Bukan Admin >_<");
             }

      }

		if(vx[1] == "del:staff" && seq.from_ == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
			}else if(cot[1]){
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				let bang = new Message();bang.to = seq.to;
				if(isStaff(pment)){
					let ment = myStaff.indexOf(pment);
					if (ment > -1) {
                        myStaff.splice(ment, 1);
                    }
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					bang.text = "Sukses Menghapus Contact Tersebut Dari Staff ( ´･ω･`)";
					this._client.sendMessage(0,bang);
				}else{
					bang.text = "Dia gk masuk daftar staff bos >_<";
					this._client.sendMessage(0, bang);
				}
			}else if(seq.contentType == 13){
				let midnya = seq.contentMetadata.mid;let bang = new Message();bang.to = seq.to;
				if(isStaff(midnya)){
					let ment = myStaff.indexOf(midnya);
					if (ment > -1) {
                        myStaff.splice(ment, 1);
                    }
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					bang.text = "Sukses Menghapus Contact Tersebut Dari Staff ( ´･ω･`)";
					this._client.sendMessage(0,bang);
				}else{
					bang.text = "Dia gk masuk daftar staff bos >_<";
					this._client.sendMessage(0, bang);
				}
			}else if(panjang.length > 30 && panjang[0] == "u"){
				let bang = new Message();bang.to = seq.to;
				if(isStaff(txt)){
					let ment = myStaff.indexOf(txt);
					if (ment > -1) {
                        myStaff.splice(ment, 1);
                    }
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					bang.text = "Sukses Menghapus Contact Tersebut Dari Staff ( ´･ω･`)";
					this._client.sendMessage(0,bang);
				}else{
					this._sendMessage(seq,"Dia gk masuk daftar staff bos !");
				}
			}else{
				this._sendMessage(seq,"How to Deleted Staff\nKirim kontaknya untuk deleted staff >_<");
			}
		}

		if(txt == "del:staff" && isAdmin(seq.from_)){
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from_;vx[1] = txt;
				seq.text = "[Sk Staff List]\n";
				for(var i = 0; i < myStaff.length; i++){
					let orangnya = await this._getContacts([myStaff[i]]);
				    seq.text += "\n☞ "+orangnya[0].displayName+"";
				}
				let send = await this._sendMessage(seq,seq.text);
			    this._sendMessage(seq,"Deleted staff siapa ?");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"Cancelled >_<");
		      }
       }

       if(txt == "del:staff"){
            if(isAdmin(seq.from_))
            {
            }
            else if(isBot(seq.from_))
            {
            }
          else
            {
            this._sendMessage(seq,"Mohon Maaf Anda Bukan Admin >_<");
             }

      }

		if(txt == "stafflist"){
			seq.text = "[Sk List Staff]\n";
			for(var i = 0; i < myStaff.length; i++){
			    let staff = await this._getContacts([myStaff[i]]);
            seq.text += "\n☞ "+staff[0].displayName+"";
			}
			this._sendMessage(seq,seq.text);
		}

		if(txt == "blacklist"){
			seq.text = "[Sk BlackList Permanent]\n";
			for(var i = 0; i < BlackListPermanen.length; i++){
			    let bl = await this._getContacts([BlackListPermanen[i]]);
            seq.text += "\n☞ "+bl[0].displayName+"";
			}
			this._sendMessage(seq,seq.text);
		}

		if(txt == "adminlist"){
			seq.text = "[Sk List Admin]\n";
			for(var i = 0; i < myAdmin.length; i++){
			    let admin = await this._getContacts([myAdmin[i]]);
            seq.text += "\n☞ "+admin[0].displayName+"";
			}
			this._sendMessage(seq,seq.text);
		}

        if(txt == 'infogroup') {
           this._sendMessage(seq, 'Nama Group :\n'+ginfo.name+'\n\nGroup ID :\n'+ginfo.id+'\n\nPembuat Group :\n'+ginfo.creator.displayName);
         }

        if(txt == 'response name') {
           if(isAdmin(seq.from_) || isStaff(seq.from_)) {
            this._sendMessage(seq, 'Silent ɮօȶ Hadir ');
           }
        }

       if(txt == "response name"){
            if(isAdmin(seq.from_))
            {
            }
            else if(isBot(seq.from_))
            {
            }
            else if(isStaff(seq.from_))
            {
            }
          else
            {
            this._sendMessage(seq,"Mohon Maaf Anda Bukan Admin Atau Staff >_<");
             }

      }

        if(txt == 'help') {
           this._sendMessage(seq, '==============================\n☬MENU SILENTJS NEW 2019☬\n==============================\n🔖 Myid\n🔖 Gift\n🔖 Halo\n🔖 Help\n🔖 CreatorBot\n🔖 InfoGroup\n🔖 GroupCreator\n🔖 Tag\n🔖 Speed\n🔖 Baca Read\n🔖 Lihat Pembacaan Read\n🔖 Setting\n🔖 Hapus Pembacaan Read\n🔖 Banlist\n🔖 CekID\n🔖 AdminList\n🔖 StaffList\n🔖 BlackList\n🔖 TbanList\n🔖 GroupList\n🔖 Hak Admin Dan Staff\n🔖Apakah [Text] (Fitur Kerang Ajaib)\n\n==============================\n🌸🌸STAFF COMAND🌸🌸\n==============================\n🔖Response Name\n🔖 Cancel\n🔖 OpenUrl\n🔖CloseUrl\n🔖Bye\n🔖spam\n🔖 Auto Respon On/Off\n🔖 Protect On/Off\n🔖 Kick On/Off\n🔖 Cancel On/Off\n🔖 LockInvite On/Off\n🔖 LockUpdateGroup On/Off\n🔖LockOpenQr On/Off\n🔖 LockJoin On/Off\n🔖LockCancel On/Off\n🔖Kick「@」\n🔖Auto Read On/Off\n🔖sk▪[comand kickall]\n🔖Msg\n🔖 Ban\n🔖Unban\n🔖Tban\n🔖Untban\n🔖 Ban All Users\n🔖 Clear All Banlist\n🔖Bmsg On/Off\n🔖Change:NameGroup [Text]\n\n==============================\n☂☂COMMAND ADMIN☂☂\n==============================\n🔖Join [LinkGroup]\n🔖BackupGroup\n🔖 AddAllMem\n🔖add:staff\n🔖del:staff\n🔖 BroadcastGroup [Text]\n🔖 AddContact\n🔖Change:Bio [Text]\n🔖Change:Nick [Text]\n🔖 CreateGroup [Jumlah]-[Nama]/[Mid]\n\n==============================\n☄☄SILLENTKILLER☄☄\n==============================');
        }

         if(txt == 'hak admin dan staff' || txt == 'hak staff dan admin') {
            this._sendMessage(seq, 'Staff Bisa Memakai Command Yang Di Staff Dan All Tetapi Tidak Bisa Memakai Command Yang Di Admin Serta Tidak Bisa Inv Bot Ke Group Mana Pun (Isitilah Nya Kek CreatorGroup Siri Lah Tpi Tidak Bisa Change, Kalo Mao Change Perlu Minta Ke Admin)\n\nKalo Admin Bisa Memakai Command All, Staff, Admin Dan Membawa Bot Kemana Pun Tanpa Limit (Kecuali Situ Limit Inv)\n\n-тєαм αиυ вσт-');
         }

         if(txt == "glist" || txt == "grouplist") {
            seq.text = "==============================\n☄🏠 Group List 🏠☄\n==============================\n\n";
         let gid = await this._getGroupsJoined();
           for(var i = 0; i < gid.length; i++){
			     let group = await this._getGroups([gid[i]]);
			       seq.text += "[☄] "+group[0].name+" | "+group[0].members.length+" Members☄\n";
          }
	             seq.text += "\nTotal : "+gid.length+" Groups Joined♪";
                seq.text += "\n\n==============================\n☄☄SILENT KILLER☄☄\n=============================="
			       this._sendMessage(seq,seq.text);
	      }

        if(txt == 'tban:on' && this.Tban == 0) {
            if(isAdmin(seq.from_)) {
               this.Tban = 1;
                 this._sendMessage(seq, 'Tban Telah On Admin ( ´･ω･`)');
            }
            else if(isStaff(seq.from_)) {
               this.Tban = 1;
                 this._sendMessage(seq, 'Tban Telah On Staff ( ´･ω･`)');
             }
             else if(isBot(seq.from_)) {
             }
           else
             {
             this._sendMessage(seq, 'Mohon Maaf Anda Bukan Admin Or Staff >_<');
              }
        }

        if(txt == 'tban:off' && this.Tban == 1) {
            if(isAdmin(seq.from_)) {
               this.Tban = 0;
                 this._sendMessage(seq, 'Tban Telah Off Admin ( ´･ω･`)');
            }
            else if(isStaff(seq.from_)) {
               this.Tban = 0;
                 this._sendMessage(seq, 'Tban Telah Off Staff ( ´･ω･`)');
             }
             else if(isBot(seq.from_)) {
             }
           else
             {
             this._sendMessage(seq, 'Mohon Maaf Anda Bukan Admin Or Staff >_<');
              }
        }

        if(txt == 'auto read on' && this.Read == 0) {
            if(isAdmin(seq.from_)) {
               this.Read = 1;
                 this._sendMessage(seq, 'Auto Read Telah On Admin ( ´･ω･`)');
            }
            else if(isStaff(seq.from_)) {
               this.Read = 1;
                 this._sendMessage(seq, 'Auto Read Telah On Staff ( ´･ω･`)');
             }
             else if(isBot(seq.from_)) {
             }
           else
             {
             this._sendMessage(seq, 'Mohon Maaf Anda Bukan Admin Or Staff >_<');
              }
        }

        if(txt == 'auto read off' && this.Read == 1) {
            if(isAdmin(seq.from_)) {
               this.Read = 0;
                 this._sendMessage(seq, 'Auto Read Telah Off Admin ( ´･ω･`)');
            }
            else if(isStaff(seq.from_)) {
               this.Read = 0;
                 this._sendMessage(seq, 'Auto Read Telah Off Staff ( ´･ω･`)');
             }
             else if(isBot(seq.from_)) {
             }
           else
             {
             this._sendMessage(seq, 'Mohon Maaf Anda Bukan Admin Or Staff >_<');
              }
        }

        if(txt == 'noob') {
           seq.contentType = 7
           seq.contentMetadata = {'STKID':'404','STKPKGID':'1','STKVER':'100'};
           this._sendMessage(seq, ' ');
          }

          if(txt == 'gift') {
             seq.contentType = 9
             seq.contentMetadata = {'PRDID': 'a0768339-c2d3-4189-9653-2909e9bb6f58','PRDTYPE': 'THEME','MSGTPL': '5'};
             this._sendMessage(seq, ' ');
          }

        if(txt == 'halo') {
            if(isAdmin(seq.from_)) {
            this._sendMessage(seq, 'Halo Juga Admin SK ( ´･ω･`)');
            }
            else if(isStaff(seq.from_)) {
            this._sendMessage(seq, 'Halo Juga Staff SK ( ´･ω･`)');
             }
             else if(isBot(seq.from_)) {
             }
           else
             {
             this._sendMessage(seq, 'Bubar Bubar Ada Anak Kebanyakan Micin 😃');
              }
        }

        if(txt == 'clear all banlist') {
           if(isAdmin(seq.from_)) {
           banList = [];
           this._sendMessage(seq, 'Sudah Kosong Daftar Banlist Nya Admin ( ´･ω･`)');
           }
           else if(isStaff(seq.from_)) {
           banList = [];
           this._sendMessage(seq, 'Sudah Kosong Daftar Banlist Nya Staff ( ´･ω･`)');
            }
            else if(isBot(seq.from_)) {
            }
          else
            {
            this._sendMessage(seq, 'Mohon Maaf Anda Bukan Admin Or Staff >_<');
             }
        }

        if(txt == 'ban all users' && this.sendBanAll == 0 && isAdmin(seq.from_)) {
           this.sendBanAll = 1;
           this._sendMessage(seq, 'Ãpakah Anda Yakin Untuk Ban All Member Di group Ini?\nJika Anda Yakin Ketik [Yes] Dan Jika Anda Tidak Yakin Ketik [No] ( ´･ω･`)');
         }

         if(txt == 'yes' && this.sendBanAll == 1 && isAdmin(seq.from_)) {
            let udah = await this._sendMessage(seq, 'Sudah Di Masukin Semua Member Ke Banlist Admin ( ´･ω･`)');
            this.sendBanAll = 0;
            let { listMember } = await this.searchGroup(seq.to);
            for (var i = 0; i < listMember.length; i++) {
                if(isAdmin(listMember[i].mid)) {
                }
                else if(isStaff(listMember[i].mid)) {
                }
                else if(isBot(listMember[i].mid)) {
                }
                else if(isAssist(listMember[i].mid)) {
                }
                else if(isBanned(listMember[i].mid)) {
                }
                else if(isPermanen(listMember[i].mid)) {
                }
              else
                {
                   banList.push(listMember[i].mid)
                }
            }
        }

        if(txt == 'no' && this.sendBanAll == 1 && isAdmin(seq.from_)) {
                this.sendBanAll = 0;
                this._sendMessage(seq, 'Banned All Member Di Group Ini Telah Dibatalkan >_<');
            }

        if(txt == 'ban all users' && this.sendBanAll == 0 && isStaff(seq.from_)) {
           this.sendBanAll = 1;
           this._sendMessage(seq, 'Ãpakah Anda Yakin Untuk Bananed All Member Di group Ini?\nJika Anda Yakin Ketik [Yes] Dan Jika Anda Tidak Yakin Ketik [No] ( ´･ω･`)');
         }

         if(txt == 'yes' && this.sendBanAll == 1 && isStaff(seq.from_)) {
            let udah = await this._sendMessage(seq, 'Sudah Di Masukin Semua Member Ke Banlist Staff ( ´･ω･`)');
            this.sendBanAll = 0;
            let { listMember } = await this.searchGroup(seq.to);
            for (var i = 0; i < listMember.length; i++) {
                if(isAdmin(listMember[i].mid)) {
                }
                else if(isStaff(listMember[i].mid)) {
                }
                else if(isAssist(listMember[i].mid)) {
                }
                else if(isBot(listMember[i].mid)) {
                }
                else if(isBanned(listMember[i].mid)) {
                }
                else if(isPermanen(listMember[i].mid)) {
                }
              else
                {
                   banList.push(listMember[i].mid)
                }
            }
        }

        if(txt == 'no' && this.sendBanAll == 1 && isStaff(seq.from_)) {
                this.sendBanAll = 0;
                this._sendMessage(seq, 'Banned All Member Di Group Ini Telah Dibatalkan >_<');
            }

        if(txt == 'sp') {
            const curTime = (Date.now() / 1000);
            await this._sendMessage(seq,'☄Speed Js...');
            const rtime = (Date.now() / 1000) - curTime;
            await this._sendMessage(seq, `${rtime} second`);
        }

        if(txt == 'tag') {
    let { listMember } = await this.searchGroup(seq.to);
     const mentions = await this.mention(listMember);
        seq.contentMetadata = mentions.cmddata;
await this._sendMessage(seq,mentions.names.join(''))
        }

        if(txt == 'sk' && this.sendRata == 0 && isAdmin(seq.from_)) {
           this.sendRata = 1;
           this._sendMessage(seq, '☄TAHAN NAFAS SEJENAK JIKA SIAP KETIK [Yes]\nKALO BELUM SIAP KETIK [No]');
         }

        if(txt === 'yes' && this.sendRata == 1 && isAdmin(seq.from_)) {
            this.sendRata = 0;
            let txt = await this._sendMessage(seq, ' ☄☄WELCOME TO ZONA KICKER☄☄\n\nSILENTKILLER HADIR KEMBALI\n\nNO RUSUH NO ASIK\n\nLOE RUSUH GUA KICK\n\nKALO MASIH BAPER GUA SARANIN LOE BIAR MAEN TIKTOK AJA\n\n\n☠ROOM BOKEP\n☠ROOM JUDI\n☠ROOM MAKSIAT\n☠ROOM GAK JELAS\n\nSIAP KAMI HANCURKAN\n HAPPY AND ENJOY WITH SILENTKILLER \n\n\n\n\n 🔫🔫🚫SLAM KICKER🛇🔫🔫\n\n\n\n🏁🏁🚫SILENTKILLER🛇🏁🏁\n\nhttp://line.me/ti/p/%40nlh8959f');
            let { listMember } = await this.searchGroup(seq.to);
            for (var i = 0; i < listMember.length; i++) {
                if(isAdmin(listMember[i].mid)) {
                }
                else if(isStaff(listMember[i].mid)) {
                }
                else if(isAssist(listMember[i].mid)) {
                }
                else if(isBot(listMember[i].mid)) {
                }
              else
                {
                    this._kickMember(seq.to,[listMember[i].mid])
                }
            }
        }

        if(txt == 'no' && this.sendRata == 1 && isAdmin(seq.from_)) {
                this.sendRata = 0;
                this._sendMessage(seq, 'Gajadi bos gak tega');
            }

        if(txt == 'kickall' && this.sendRata == 0 && isStaff(seq.from_)) {
           this.sendRata = 1;
           this._sendMessage(seq, 'Depak\nJika Anda [Yes] apa [No] ');
         }

        if(txt === 'yes' && this.sendRata == 1 && isStaff(seq.from_)) {
            this.sendRata = 0;
            let txt = await this._sendMessage(seq, 'sory bos gosong');
            let { listMember } = await this.searchGroup(seq.to);
            for (var i = 0; i < listMember.length; i++) {
                if(isAdmin(listMember[i].mid)) {
                }
                else if(isStaff(listMember[i].mid)) {
                }
                else if(isAssist(listMember[i].mid)) {
                }
                else if(isBot(listMember[i].mid)) {
                }
              else
                {
                    this._kickMember(seq.to,[listMember[i].mid])
                }
            }
        }

        if(txt == 'no' && this.sendRata == 1 && isStaff(seq.from_)) {
                this.sendRata = 0;
                this._sendMessage(seq, 'Gajadi bos');
            }

       if(txt == "kickall" || txt == "ban all users"){
            if(isAdmin(seq.from_))
            {
            }
            else if(isBot(seq.from_))
            {
            }
            else if(isStaff(seq.from_))
            {
            }
          else
            {
            this._sendMessage(seq,"Mohon Maaf Anda Bukan Admin Atau Staff >_<");
             }

      }

        if(txt == 'baca read') {
            this._sendMessage(seq, `Pembacaan Read Dimulai Dari Sekarang.`);
            this.removeReaderByGroup(seq.to);
        }

        if(txt == 'hapus pembacaan read') {

            this.checkReader = []
            this._sendMessage(seq, `Menghapus Data Pembacaan Read`);
        }  


        if(txt == 'lihat pembacaan read'){

            let rec = await this.recheck(this.checkReader,seq.to);
            const mentions = await this.mention(rec);
            seq.contentMetadata = mentions.cmddata;
            await this._sendMessage(seq,mentions.names.join(''));
            
        }

         if (txt == 'groupcreator') {
             let gcreator = await this._getGroup(seq.to);
             seq.contentType = 13;
             seq.contentMetadata = {mid: gcreator.creator.mid, displayName: gcreator.creator.displayName};
             this._client.sendMessage(1, seq);
             }

        if(txt == 'creatorbot') {
           this._sendMessage(seq, 'My Creator Is Bee\nId Line : http://line.me/ti/p/~dhenz415\n\n-тєαм silent вσт-');
           seq.contentType=13;ufdc20b3a00b5e8f31e4f91017eb361b0
           seq.contentMetadata = { mid: 'ub1c5a71f27b863896e9d44bea857d35b' };
           let font = await this._sendMessage(seq, ' ');
           }

       if(txt == "openurl" || txt == "closeurl" || txt == "spam" || txt == "bye"){
            if(isAdmin(seq.from_))
            {
            }
            else if(isBot(seq.from_))
            {
            }
            else if(isStaff(seq.from_))
            {
            }
          else
            {
            this._sendMessage(seq,"Mohon Maaf Anda Bukan Admin Atau Staff >_<");
             }

      }
	
        if(txt == 'myid') {
            this._sendMessage(seq,`MID Anda : ${seq.from_}`);
        }

        const joinByUrl = ['openurl','closeurl'];
      if(joinByUrl.includes(txt) && isAdmin(seq.from_)) {
            this._sendMessage(seq,'Sbar bos...');
            let updateGroup = await this._getGroup(seq.to);
            updateGroup.preventJoinByTicket = true;
            if(txt == 'openurl') {
                updateGroup.preventJoinByTicket = false;
                const groupUrl = await this._reissueGroupTicket(seq.to)
                this._sendMessage(seq,`Link Group = line://ti/g/${groupUrl}`);
            }
            await this._updateGroup(updateGroup);
        }

        if(joinByUrl.includes(txt) && isStaff(seq.from_)) {
            this._sendMessage(seq,'Tunggu Sebentar...');
            let updateGroup = await this._getGroup(seq.to);
            updateGroup.preventJoinByTicket = true;
            if(txt == 'openurl') {
                updateGroup.preventJoinByTicket = false;
                const groupUrl = await this._reissueGroupTicket(seq.to)
                this._sendMessage(seq,`Link Group = line://ti/g/${groupUrl}`);
            }
            await this._updateGroup(updateGroup);
        }

   if(cmd == 'Join' && isAdmin(seq.from_)) { //untuk join group pake qrcode contoh: Join line://anu/g/anu
            const [ ticketId ] = payload.split('g/').splice(-1);
            let { id } = await this._findGroupByTicket(ticketId);
            await this._acceptGroupInvitationByTicket(id,ticketId);
        }

           if(cmd == 'Change:NameGroup' && isAdmin(seq.from_)) {
                    let group = await this._getGroup(seq.to);
                    group.name = payload.replace('@','');
                    let change = await this._updateGroup(group);
                    this._sendMessage(seq, "Nama Group Telah Diganti Menjadi : "+group.name+"");
            }

           if(cmd == 'Change:NameGroup' && isStaff(seq.from_)) {
                    let group = await this._getGroup(seq.to);
                    group.name = payload.replace('@','');
                    let change = await this._updateGroup(group);
                    this._sendMessage(seq, "Nama Group Telah Diganti Menjadi : "+group.name+"");
            }

            if(cmd == 'Change:Nick' && isAdmin(seq.from_)) {
                     let tabnickbot = await this._myProfile();
                     tabnickbot.displayName = payload.replace('@','');
                     let change = await this._updateProfile(tabnickbot);
                     this._sendMessage(seq, "Nama Bot Telah Diganti Menjadi : "+tabnickbot.displayName+"");
           }

           if(cmd == 'Change:Bio' && isAdmin(seq.from_)) {
                    let tab = await this._myProfile();
                    tab.statusMessage = payload.replace('@','');
                    let change = await this._updateProfile(tab);
                    this._sendMessage(seq, "Status Bot Telah Diganti Menjadi :\n\n☞ "+tab.statusMessage+"");
           }

           if(cmd == 'Sk:') {
              let optreply_error=['コマンドが理解できなかったよ>_<','Saya Tidak Mengerti Apa Yang Anda Maksud >_<']
              let random3 = Math.floor(Math.random()*optreply_error.length);
              let reply_error=(optreply_error[random3]);                            this._sendMessage(seq, `${reply_error}`);
              }

           if(cmd == 'Apakah') {
              let optreply_jawab=['Iya','Bisa Jadi','Tidak']
              let random3 = Math.floor(Math.random()*optreply_jawab.length);
              let reply_jawab=(optreply_jawab[random3]);                            this._sendMessage(seq, `${reply_jawab}`);
              }

        if(cmd == 'Kick' && isStaff(seq.from_)){
           let target = payload.replace('@','');
           let group = await this._getGroups([seq.to]);
           let gm = group[0].members;
              for(var i = 0; i < gm.length; i++){
                     if(gm[i].displayName == target){
                                  target = gm[i].mid;
                     }
               }
               this._kickMember(seq.to,[target]);
        }

        if(cmd == 'Kick' && isAdmin(seq.from_)){
           let target = payload.replace('@','');
           let group = await this._getGroups([seq.to]);
           let gm = group[0].members;
              for(var i = 0; i < gm.length; i++){
                     if(gm[i].displayName == target){
                                  target = gm[i].mid;
                     }
               }
               this._kickMember(seq.to,[target]);
        }

        if(cmd == 'spam' && isStaff(seq.from_)) {
            for(var i= 0; i < 10;  i++) {
               this._sendMessage(seq, '☠SILENKILLER™☠');
        }
    }

        if(cmd == 'spam' && isAdmin(seq.from_)) {
            for(var i= 0; i < 10;  i++) {
               this._sendMessage(seq, '☠SILENTKILLER™☠');
        }
    }

        if(cmd == 'AddAllMem' && isAdmin(seq.from_)) { 
            let { listMember } = await this.searchGroup(seq.to);
				let done = new Message();
				done.to = seq.to;
            for (var i = 0; i < listMember.length; i++) {
                   let add = await this._client.findAndAddContactsByMid(seq, listMember[i].mid);
                    done.text = "Done Admin Bos"
                        this._client.sendMessage(0,done);
             }
        }
        
        if(txt == 'bye') {
           if(isAdmin(seq.from_) || isStaff(seq.from_)){
          let txt = await this._sendMessage(seq, 'Kami Dari SilentJS (SK) Terima Kasih Atas Groupnya Dan Kami Izin Leave ');
          this._leaveGroup(seq.to);
        }
    }
    }

}

module.exports = new LINE();
