import './FormElements.css';
import { Input, DatePicker, Row, Col, Upload, Select, Checkbox, Divider} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, InboxOutlined  } from '@ant-design/icons';
import { useState } from 'react';

function FormElements({formItems, handleChangeEvent, handleChangeSelectData, handleChangeData, handleFileUpload}) {
  const defaultFile = {
        uid: '0',
        name: 'Image Preview',
        className: 'placeholder',
        status: 'done',
      };
  const [isElementFocused, setIsElementFocused] = useState({});
  const [uploadFileList, setUploadFileList] = useState([defaultFile])
  const FORM_ELEMENTS = {
    input: (item) => getFormInputElement(item),
    textarea: ({id, type, name, label, placeholder}) => {
      return (
        <div className={`FormElements-element ${type} FormElements-elements-container`}>
          <Input.TextArea id={id} name={name} onChange={handleChangeEvent} placeholder={placeholder}></Input.TextArea>
          <label htmlFor={name}>{label}</label>
        </div>
      )
    },
    checkboxGroup: ({label, name, items}) => {
      return (
        <>
         <Divider orientation="left" className="FormElements-section-label">{label}</Divider>
          <Checkbox.Group onChange={(value) => handleChangeData({name, value})}>
          <Row>
            {
              items.map(item => (
                <Col key={item.id} span={24} md={12}>
                  <Checkbox
                    name={item.name}
                    value={item.label}>
                      {item.label}
                  </Checkbox>
                </Col>
              ))
            }
          </Row>
          </Checkbox.Group>
        </>
      )
    },
    inputRow: ({items}) => {
      return (
        <Row align="middle">
          {
            items.map((item, index) => (
              <Col key={item.id} offset={0} flex="auto" md={{offset: index === 0 ? 0 : 1}} className={`FormElements-element ${item.type}`}>
                {FORM_ELEMENTS[item.element](item)}
              </Col>
            ))
          }
        </Row>
      )
    },
    datePicker: ({id, type, name, label, placeholder}) => {
      return (
        <div className={`FormElements-element ${type} FormElements-elements-container`}>
          <DatePicker
            size="large"
            id={id}
            name={name}
            onChange={(momentDate, dateString) => {setIsElementFocused({[id]: false}); return handleChangeData({name, value: dateString})}}
            placeholder={placeholder}
            format={`MM/DD/YYYY`}
            onFocus={() => setIsElementFocused({[id]: true})}
            onBlur={() => setIsElementFocused({[id]: false})}
            open={isElementFocused[id]}
            showToday={false}>
          </DatePicker>
          <label htmlFor={name}>{label}</label>
        </div>
      )
    },
    uploadDragger: ({id, type, name, label, multiple, accept, placeholder, text, hint, listType}) => {
      return (
        <div className="FormElements-elements-container">
        <Upload.Dragger
            accept={accept}
            multiple={false}
            fileList={uploadFileList}
            transformFile={() => {}}
            onChange={(value) => {
                if(!multiple){
                  //limits file list to only one file
                  const fileList = [...value.fileList];
                  setUploadFileList(fileList.slice(-1));
                  if(fileList.slice(-1).length === 0){
                    //reset back to default image if all files have been removed
                    setUploadFileList([defaultFile]);
                  }
                }
                return handleChangeData({name, value})
              }
            }
            showUploadList={
              {
                showRemoveIcon: uploadFileList[0]?.className !== 'placeholder',
                showPreviewIcon: false,
              }
            }
            customRequest={(value) => handleFileUpload({name, value})}
            listType={listType}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">{text}</p>
            <p className="ant-upload-hint">
              {hint}
            </p>
          </Upload.Dragger>
          <label htmlFor={name}>{label}</label>
        </div>
      )
    },
    selectTags: ({id, type, name, label, placeholder, tags}) => {
      return (
        <Select mode="tags"
                size="large"
                className="FormElements-elements-container"
                onChange={(value) => handleChangeSelectData({name, value})}
                onFocus={() => setIsElementFocused({[id]: true})}
                onBlur={() => setIsElementFocused({[id]: false})}
                open={isElementFocused[id]}
                tokenSeparators={[',']}
                placeholder={placeholder}>
          {tags.map((tag) => (
            <Select.Option key={tag.id} value={tag.text}>{tag.text}</Select.Option>
          ))}

        </Select>
      )
    }
  }

  function getFormInputElement({id, type, name, label, placeholder}){
    return (
      <div className='FormElements-elements-container'>
        {

          type === 'password'
          ?
          <Input.Password size="large" type={type} id={id} name={name} onChange={handleChangeEvent} placeholder={placeholder} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
          :
          <Input size="large"  type={type} id={id} name={name} onChange={handleChangeEvent}  placeholder={placeholder}/>
        }
        <label htmlFor={name}>{label}</label>
      </div>
    )
  }

  function getFormElement(item){
    let {element = 'input'} = item;
    return FORM_ELEMENTS[element](item);
  }

  return (
    <div className="FormElements">
      {formItems.map(formItem => (
        <div key={formItem.id} className={`FormElements-element-${formItem.element}`}>
          {getFormElement(formItem)}
        </div>
      ))}
    </div>
  );
}

export default FormElements;
