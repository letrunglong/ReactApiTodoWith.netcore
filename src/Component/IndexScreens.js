import React, { Component } from 'react';
import { Button, Row, Col, Input } from 'antd';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/'
})

class IndexScreens extends Component {
  constructor(props) {
    super(props);

    this.getApi();
    this.state = {
      courses: [],
      how: '',
      plat: '',
      command: ''
    }
    this.handleChangeHowto = this.handleChangeHowto.bind(this);
    this.handleChangePlatform = this.handleChangePlatform.bind(this);
    this.handleChangeCommand = this.handleChangeCommand.bind(this);
  }
  handleChangeHowto(event) {
    this.setState({
      how: event.target.value
    });
  }
  handleChangePlatform(event) {
    this.setState({
      plat: event.target.value
    });
  }
  handleChangeCommand(event) {
    this.setState({
      command: event.target.value
    });
  }
  getApi = async () => {
    let data = await api.get('/api/commands').then(({ data }) => data);
    this.setState({ courses: data })
  }
  createCourse = async () => {
    if (this.state.how === "" || this.state.plat === "" || this.state.command === "") {
      alert('Value not be null')
    } else {
      let res = await api.post('/api/commands', { howto: this.state.how, platform: this.state.plat, commandline: this.state.command })
      this.getApi();
    }

  }
  deleteCourse = async (id) => {
    let data = await api.delete(`/api/commands/${id}`)
    this.getApi();
  }

  updateCourse = async (id) => {
    // let data = await api.patch(`/${id}`, { howto: value })
    // map liên quan gì vậy? để làm gì nay search thay . sua lai theo ma no cung deo chay
    if (this.state.how === "" || this.state.plat === "" || this.state.command === "") {
      alert('Value not be null')
    } else {
      let res = await api.put(`/api/commands/${id}`, { id, howto: this.state.how, platform: this.state.plat, commandline: this.state.command })
      this.getApi();
    }

    // courses.map(courses=>{
    //   if(courses.id===id){
    //     courses.howto = this.state.howto;
    //     courses.platform = this.state.platform;
    //     courses.commandline = this.state.commandline;
    //   }
    // })
    this.getApi()
  }
  render() {
    return (
      <div className='index main'>
        <h2>Home</h2>
        <Row className="row">
          <Col span={8} className="">
            <Input placeholder="howto..." onChange={this.handleChangeHowto} value={this.state.how}
            />
            <Input placeholder="platform..." onChange={this.handleChangePlatform} value={this.state.plat} />
            <Input placeholder="commandline..." onChange={this.handleChangeCommand} value={this.state.command} />
            <Button type="primary" onClick={this.createCourse} style={{ marginTop: '10px' }}>ADD NEW</Button>
          </Col>
          <Col span={16} className="main-content">
            {this.state.courses.map(courses =>
              <div className="one-item">
                <div className="title">
                  <div>TITLE:</div>
                  <div key={courses.id}>{courses.howto}</div>
                </div>
                <div className="content">
                  <div>Content:</div>
                  <p>{courses.platform}</p>
                </div>
                <div className="command">
                  <div>Description:</div>
                  <p>{courses.commandline}</p>
                </div>
                <div className="bottom">
                  <Button type='primary' className='but-1 but'
                    onClick={() => this.deleteCourse(courses.id)}>
                    Delete
                </Button>
                  <Button type='default' className='but-2 but'
                    onClick={() => this.updateCourse(courses.id, `${courses.howto}asdasd`)}>
                    Update
                </Button>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default IndexScreens;