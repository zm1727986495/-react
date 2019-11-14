import React, { Component } from 'react';
import {listCustomerService,client_search_cp,search} from '@api/home/home'
import { Input,Button } from 'element-react';
import 'element-theme-default';


class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {tableData:[],inpVal:'',accuracy:''};
    // this.getData()
  }
  //获取歌曲
  getData=()=>{
    let data = {
      page: 1,
      limit: 20
    }
    listCustomerService(data).then(res=>{
      if(res.status == 200){
        // this.setState({tableData:res.data.data.rows})
      }
    })


    let mus = {
      ct: 24,
      qqmusic_ver: 1298,
      new_json: 1,
      remoteplace: 'txt.yqq.song',
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
      loginUin: 0,
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
        let datas=res.data.data.zhida.zhida_singer.hotsong
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
    }else{
      if(e.keyCode==13){
        this.getData()
      }
    }
  }
  //输入内容
  handelChange = val =>{
   this.setState({inpVal:val})
  //  this.getSearch(val)
  }

  //输入内容调取接口
  getSearch=(val)=>{
    let data = {
      is_xml: 0,
      key:val,
      g_tk: 5381,
      loginUin: 0,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0
    }
    search(data).then(res=>{
      console.log(res);
      
    })
  }

  render(){
    let {tableData=[],accuracy} = this.state;
    let ulLIStyle = {
      sear:{
        display:'flex',
      },
      li:{
        cursor: 'pointer',
        height:'30px'
      }
    }
    
    return (<div>

      <div style={ulLIStyle.sear}>
        <Input style={{width:"200px"}} onKeyUp={this.search} onChange={this.handelChange} placeholder="请输入内容" />
        <Button type="primary" style={{width:"70px"}} onClick={e=>this.search(e,1)}>搜索</Button>
      </div>


      {tableData.length?<ul>
        {tableData.map((item,i)=>{
          return <li style={ulLIStyle.li} key={i}>{accuracy==1?item.songName:item.title}</li>
        })}
      </ul>:<div>暂无数据</div>}

    </div>)
  }
}

export default Home;