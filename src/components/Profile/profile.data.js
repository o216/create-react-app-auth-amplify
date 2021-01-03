import { nanoid } from 'nanoid';

const internalInputs = [
  {id: nanoid(), element: 'inputRow', items: [
    {id: nanoid(), element: 'input', type: 'text', name: 'firstName', placeholder: 'First Name'},
    {id: nanoid(), element: 'input', type: 'text', name: 'lastName', placeholder: 'Last Name'}
  ]},
  {id: nanoid(), element: 'selectTags', type: 'text', name: 'pronouns', placeholder: 'Pronouns', tags: [
    {id: nanoid(), text: 'she/her/hers'},
    {id: nanoid(), text: 'he/him/his'},
    {id: nanoid(), text: 'they/them/theirs'}
  ]},
  {id: nanoid(), element: 'input', type: 'text', name: 'location', placeholder: 'City and State i.e. \'New Orleans, LA\''},
  {id: nanoid(), element: 'input', type: 'text', name: 'healthInsurance', placeholder: 'Health Insurance'},
  {id: nanoid(), element: 'datePicker', type: 'datePicker', name: 'birthday', placeholder: 'Birthday'},
  {id: nanoid(), element: 'uploadDragger', type: 'dragger', name: 'photoOfYourself', multiple: false, accept: 'image/x-png,image/gif,image/jpeg', placeholder: 'Photo of Yourself', text: 'Upload a profile image', hint: 'Click or drag file to this area to upload.', listType: 'picture-card'},
  {id: nanoid(), element: 'textarea', type: 'textarea', name: 'description', placeholder: 'Describe Yourself'},
];

const externalInputs = [
  {id: nanoid(), element: 'checkboxGroup', name: 'competencyAreas', label: 'Select Competency Area(s)', items: [
    {id: nanoid(), element: 'input', type: 'checkbox', name: 'africanAmericanCulture', label: 'African American Culture', value: 'African American Culture' },
    {id: nanoid(), element: 'input', type: 'checkbox', name: 'latinxCulture', label: 'Latinx Culture', value: 'Latinx Culture'},
    {id: nanoid(), element: 'input', type: 'checkbox', name: 'nativeAmericanCulture', label: 'Native American Culture', value: 'Native American Culture'},
    {id: nanoid(), element: 'input', type: 'checkbox', name: 'asianAmericanCulture', label: 'Asian American Culture', value: 'Asian American Culture' },
    {id: nanoid(), element: 'input', type: 'checkbox', name: 'hinduCulture', label: 'Hindu Culture', value: 'Hindu Culture'},
    {id: nanoid(), element: 'input', type: 'checkbox', name: 'christianCulture', label: 'Christian Culture', value: 'Christian Culture'},
    {id: nanoid(), element: 'input', type: 'checkbox', name: 'muslimCulture', label: 'Muslim Culture', value: 'Muslim Culture'},
    {id: nanoid(), element: 'input', type: 'checkbox', name: 'lgtbqiaCulture', label: 'LGBTQIA+ Culture', value: 'LGBTQIA+ Culture'},
    {id: nanoid(), element: 'input', type: 'checkbox', name: 'noneSpecifiedCulture', label: 'Prefer Not to Say', value: 'Prefer Not to Say'},
    {id: nanoid(), element: 'input', type: 'text', name: 'otherCulture', label: 'Other', value: 'Other'},
  ]},
  {id: nanoid(), element: 'checkboxGroup', name: 'languagePreferences', label: 'Select Preferred Language(s)', items: [
    {id: nanoid(), element: 'input', type: 'checkbox', name: 'englishLanguage', label: 'English', value: 'English'},
    {id: nanoid(), element: 'input', type: 'checkbox', name: 'spanishLanguage', label: 'Spanish', value: 'Spanish'},
    {id: nanoid(), element: 'input', type: 'checkbox', name: 'chineseLanguage', label: 'Chinese', value: 'Chinese'},
    {id: nanoid(), element: 'input', type: 'text', name: 'otherLanguage', label: 'Other', value: 'Other'},
  ]},
];

export {internalInputs, externalInputs};
