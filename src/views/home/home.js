import React, { Component } from 'react';
import {listCustomerService,client_search_cp,search,audioFun,common} from '@api/home/home'
import { Input,Button,Message } from 'element-react';
import 'element-theme-default';


class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {tableData:[],Deposit:[],inpVal:'',accuracy:'',innhtml:'',audioSrc:''};
    this.getMisData()
  }

  getMisData=()=>{
    let data = {
      source: 'pc',
      weather_type: 'observe|forecast_1h|forecast_24h|index|alarm|limit|tips|rise',
      province: '河北省',
      city: '张家口',
      county: '',
      callback: 'jQuery1113024686955861497917_1575007313829',
      _: 1575007313831,
    }
    common(data).then(res=>{
      // console.log(res);
      
    })
  }
  //点击歌名播放歌曲
  getAudio=(mid,name)=>{
    let data = {
      '-': 'getplaysongvkey8863583479930659',
      g_tk: 600087168,
      loginUin: 1727986495,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0,
      data: {"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"4300893668","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"4300893668","songmid":[mid],"songtype":[0],"uin":"1608335773","loginflag":1,"platform":"20"}},"comm":{"uin":1608335773,"format":"json","ct":24,"cv":0}}
    }
    audioFun(data).then(res=>{
      if(res.data.req_0.code==0){
        if(!res.data.req_0.data.midurlinfo[0].purl){
          Message.error('当前歌曲需要vip！')
          return
        }
        var mp3 = res.data.req_0.data.sip[0]+res.data.req_0.data.midurlinfo[0].purl;
        this.setState({audioSrc:mp3})
        this.textAudio.play();
        if(name){
          let arr = this.state.Deposit;
          let flag = arr.some(item=>{
            return item.mid==mid
          })
          if(flag){
            return
          }
          arr.push({mid,name})
          this.setState({Deposit:arr})
        }
        
      }

    })
  }
  //获取歌曲名字
  getData=()=>{
    // let data = {
    //   page: 1,
    //   limit: 20
    // }
    // listCustomerService(data).then(res=>{
    //   if(res.status == 200){
    //     // this.setState({tableData:res.data.data.rows})
    //   }
    // })


    let mus = {
      ct: 24,
      qqmusic_ver: 1298,
      new_json: 1,
      remoteplace: 'txt.yqq.song',//txt.yqq.lyric  歌词
      searchid: 59568499194168183,
      t: 0,
      aggr: 1,
      cr: 1,
      catZhida: 1,
      lossless: 0,
      flag_qc: 0,
      p: 1,
      n: 10,
      w: this.state.inpVal,
      g_tk: 5381,
      loginUin: 1727986495,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0
    }
    client_search_cp(mus).then(res=>{
      console.log(res);
      if(res.data.data.zhida.type==1){
        let datas=res.data.data.zhida.zhida_singer.hotsong;
        this.setState({tableData:datas,accuracy:1});
      }else{
        let datas=res.data.data.song.list
        this.setState({tableData:datas,accuracy:2});
      }
    })
    
  }
  //搜索歌曲
  search=(e,type)=>{
    if(type==1){
      this.getData()
      // this.getSearch(this.state.inpVal)
    }else{
      if(e.keyCode==13){
        this.getData()
        // this.getSearch(this.state.inpVal)
      }
    }
    
  }
  //输入内容
  handelChange = val =>{
   this.setState({inpVal:val})
   this.getSearch(val)
  }

  //输入内容调取接口
  getSearch=(val)=>{
    let data = {
      is_xml: 0,
      key:val,
      g_tk: 5381,
      loginUin: 1727986495,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0
    }
    search(data).then(res=>{
      if(res.data.code==0){
        console.log(res.data.data.song.itemlist);
        this.setState({tableData:res.data.data.song.itemlist,accuracy:3})
      }
    })

  }

  onEndedFun=()=>{
    let {Deposit} = this.state;
    let s = Math.floor(Math.random()*Deposit.length);
    this.getAudio(Deposit[s].mid)
  }

  render(){
    let {tableData=[],accuracy,innhtml,audioSrc,Deposit} = this.state;
    let ulLIStyle = {
      sear:{
        display:'flex',
      },
      li:{
        cursor: 'pointer',
        height:'30px'
      },
      audioSty:{
        position: 'absolute',
        bottom: 0,
        width: '100%'
      }
    }
    
    return (<div>
     
       <div style={ulLIStyle.sear}>
        <Input style={{width:"200px"}} onKeyUp={this.search} onChange={this.handelChange} placeholder="请输入内容" />
        <Button type="primary" style={{width:"70px"}} onClick={e=>this.search(e,1)}>搜索</Button>
      </div>
      {/* {innhtml} */}

     {tableData.length?<ul>
        {tableData.map((item,i)=>{
          let name =accuracy==1?item.songName:(accuracy==2?item.title:item.name)
          return <li style={ulLIStyle.li} key={i} onClick={this.getAudio.bind(this,item.songMID?item.songMID:item.mid,name)}>{name}</li>
        })}
      </ul>:<div>暂无数据</div>}


      <div style={{marginTop:'30px'}}>
        听过的音乐:
        {Deposit.length?<ul>
          {Deposit.map((item,i)=>{
            return <li style={ulLIStyle.li} key={i} onClick={this.getAudio.bind(this,item.mid,null)}>{item.name}</li>
          })}
        </ul>:<div></div>}
      </div>

      <div style={ulLIStyle.audioSty}>
        <audio onEnded={this.onEndedFun} ref={audio => this.textAudio = audio} style={{width:'100%'}} src={audioSrc} controls="controls"></audio>
      </div>

    </div>)
  }
}

export default Home;