import './Profile.css';
import {internalInputs, externalInputs} from './profile.data';
import FormElements from '../FormElements/FormElements';
import Preview from './Preview';
import { useHistory, useParams } from "react-router-dom";
import { useState } from 'react';
import firebase from '../../utilities/firebase';
import { Button, Card, Steps, Drawer} from 'antd';
import { DoubleRightOutlined} from '@ant-design/icons';
import 'firebase/database';
import 'firebase/storage';

function Profile(props) {
  const firebaseStorageImagesRef = firebase.storage().ref().child(`profileImages/${props.user.uid}`);
  const firebaseUsersDBRef = firebase.database().ref('users/' + props.user.uid);
  const history = useHistory();
  let { paramId = '1' } = useParams();
  const [inputValues, setInputValues] = useState({});
  const [drawer, setDrawer] = useState({isVisible: false, data: {}});

  async function handlePreview(e){
    e.preventDefault();
    firebaseUsersDBRef.set(
      {...inputValues},
      async (error) => {
        if (error) {
          alert(error);
        } else {
          const snapshot =  await firebaseUsersDBRef.once('value');
          const profileImage =  await firebaseStorageImagesRef.getDownloadURL();
          setDrawer({...drawer, data: {...snapshot.val(), profileImage} , isVisible: true});
        }
      }
    );
  }

  function handleChangeEvent(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setInputValues({
      ...inputValues,
      [name] : value
    });
  }

  function handleChangeSelectData({name, value}) {
    let newValues = [];
    if(value.includes(',')){
      newValues = value.split(',');
    }
    else{
      newValues.push(value);
    }
    setInputValues({
      ...inputValues,
      [name] : newValues
    });
  }

  async function handleChangeData({name, value}){
    if(value?.file?.originFileObj){
      const { file } = value;
      const { status, type, originFileObj } = file;
      if (status === 'done') {
        firebaseStorageImagesRef.put(originFileObj, {contentType: type}).catch(err => alert(err));
      }
      else if(status === 'removed'){
        firebaseStorageImagesRef.delete().catch(err => alert(err));
      }
      else if (status === 'error') {
        alert(`${file.name} file upload failed.`);
      }
    }
    else{
      //To-do: for datepicker, update antd to use dayjs instead of momentjs, then check if date
      setInputValues({
        ...inputValues,
        [name] : value
      });
    }
  }

  async function handleFileUpload({value}) {
    const {onSuccess} = value;
    onSuccess("ok")
  }

  function goToStepTwo(){
    firebaseUsersDBRef.set({
      ...inputValues
    });
    history.push(`/profile/2`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    firebaseUsersDBRef.set({
      ...inputValues
    });
    history.push(`/search`);
  }

  return (
    <div className="Profile">
      <Drawer
        title="Profile Preview"
        placement="right"
        closable="true"
        visible={drawer.isVisible}
        onClose={() => {setDrawer({...drawer, isVisible: false})}}
        width={global.window.innerWidth > 768 ? '50%' : '100%'}>
        <Preview {...drawer.data}/>
      </Drawer>
      {
        paramId === '1' ?
        <div className={`Profile-${paramId}`}>
          <div className="steps-container">
            <Steps size="small" current={1}>
              <Steps.Step title="Sign Up" description="Create an Account." />
              <Steps.Step title="Describe Yourself" description="Start Profile." />
              <Steps.Step title="Select Your Preferences" description="Complete Profile."/>
            </Steps>
          </div>
          <Card className="form-container">
            <h1>Describe Yourself</h1>
            <FormElements
              formItems={internalInputs}
              handleChangeEvent={handleChangeEvent}
              handleChangeData={handleChangeData}
              handleChangeSelectData={handleChangeSelectData}
              handleFileUpload={handleFileUpload}/>
            <div className="footer-container">
              <Button className="next-button" type="primary" name="nextButton" onClick={goToStepTwo}>
                Next <DoubleRightOutlined />
              </Button>
            </div>
          </Card>
        </div>
      :
        <div className={`Profile-${paramId}`}>
          <div className="steps-container">
            <Steps size="small" current={2}>
              <Steps.Step title="Sign Up" description="Create an Account." />
              <Steps.Step title="Describe Yourself" description="Start Profile." />
              <Steps.Step title="Select Your Preferences" description="Complete Profile."/>
            </Steps>
          </div>
          <Card className="form-container">
            <h1>Select Your Preferences</h1>
            <FormElements
              formItems={externalInputs}
              handleChangeData={handleChangeData} />
            <div className="footer-container">
              <Button className="preview-button" onClick={(e) => handlePreview(e)}>Preview Profile</Button>
              <Button type="primary" className="search-button" onClick={(e) => handleSubmit(e)}>Search Providers</Button>
            </div>
          </Card>
        </div>
      }
    </div>
  );


}

export default Profile;
