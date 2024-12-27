import React from 'react'
import './examNav.css'
import { connect } from 'react-redux'
import funnel from '../../assets/products/funnel.png'
import NoOffSchedule from './NoOffSchedule';
import SearchImg from "../../assets/search/searchbar.png";
// import Slider from "./Slider"
import Slider from '../../services/Slider';
class ExamNav extends React.Component {
  constructor(props) {
    super(props);
    this.state =
      { Searchvalue: "intial", choosen_label_id: "", };
  }

  componentDidUpdate(prevState) { if (this.state.Searchvalue == prevState.Searchvalue) { this.props.changeSearch(this.state.Searchvalue) } }

  toggleSearch = (value) => { this.setState({ Searchvalue: value }) }

  render() {
   
    return (
      <>
        <div>
        </div>
        {(this.props.online_or_offline === "online")
          ?
          this.props.test_labels_data.data && this.props.test_labels_data.data.length > 0
            ?
            <div className="exam-nav" >
              <nav className='live1'>
                <div className="back-div">
                  <Slider>
                    {
                      this.props.test_labels_data.data.map((label_element, index) =>
                      <div className="child" style={label_element.label_id === this.state.choosen_label_id ? { color: "#fff", background: "#1953E7" } : {}} >
                        <span className='navheadding'  style={label_element.label_id === this.state.choosen_label_id ? { color: "#fff"} : {}}
                          onClick={() => {
                            this.setState({ choosen_label_id: label_element.label_id })
                            this.props.ChildExamNav(label_element.label_name, label_element.label_id, label_element.test_type_id, label_element)
                          }}
                        >{label_element.label_name}</span>
                        </div>)
                    }
                  </Slider>
                </div>
                <div style={{ display: "flex", alignItems: "center", paddingRight: "10px", marginRight: "10px" }}>
                  <div className="Search_bar" style={{}}>
                    <form className="form_Style" onSubmit={(e) => e.preventDefault()} style={{ width: "100%", border: "1px solid #D7D5EA", borderRadius: "5px", paddingBottom: "5px", paddingTop: "5px" }}>
                      <input className="Search_Input" type="text" value={this.props.search} placeholder="Search " onChange={(e) => this.props.setSearch(e.target.value)} />
                      <button className="Search_button" style={{ border: 0, background: "#fff" }} ><img src={SearchImg} /></button>
                    </form>
                  </div>
                </div>
              </nav>
            </div>
            : ""
          :
          <></>
        }
      </>)
  }
}
const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(ExamNav)