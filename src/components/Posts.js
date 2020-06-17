import React, { useState, Component } from 'react';
import { Row, Col, Modal, ModalBody, ModalHeader, Button , Label} from 'reactstrap'
import Select from 'react-select';
import { Control, LocalForm, Errors } from 'react-redux-form';
import '../../node_modules/font-awesome/css/font-awesome.min.css';


const actions = [
    { value: 'No Actions', label: 'No Actions' },
    { value: 'Delete Contacts', label: 'Delete Contacts' },
    { value: 'Download Contacts', label: 'Download Contacts' },
    { value: 'Block', label: 'Block' },
    { value: 'Unblock', label: 'Unblock' },
];

const options = [
    {
        value: 'No Actions', label: 'No Actions'
    }, {
        value: 'Add Contacts', label: 'Add Contacts'
    }, {
        value: 'Upload Contacts', label: 'Upload Contacts'
    }
]

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || (val.length<=len);
const minLength = (len) => (val) => val && (val.length>=len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

const Posts = ({ posts, loading }) => {

    const [ selectedAction, setSelectedAction ] = useState(null)
    const [ selectedOption, setSelectedOption ] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

  if (loading) {
    return <h2>Loading...</h2>;
  }

  function Checkbox() {
    const [checked, setChecked] = React.useState(false);
  
    return (
        <input type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
     
    );
  }

  const handleChange = selectedOption => {
    setSelectedAction(selectedOption)
    
  };

  const handleChangeOption = (value) => {
    setSelectedOption(value)    
    setIsModalOpen(true)
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
}

const handleSubmit = (values) => {
    posts.push({
        name:values.firstname,
        email:values.email,
        phone:values.telnum
    })
    setIsModalOpen(false)
}


  return (
    <div className='container'>
        <Row style={{alignItems:'center',marginBottom:30}}> 
            <p className='col-3' style={{marginLeft:20}}>Total Contacts - {posts.length}</p>
            <input  type='search' placeholder='Search' size='30' style={{height:60,borderRadius:5,borderWidth:1,paddingLeft:30,marginRight:50}}></input>
            <Select className='col-3'
                options={actions}
                value={selectedAction}
                onChange={handleChange}
            />

            <Select className='col-2'
                options={options}
                value={selectedOption}
                onChange={handleChangeOption}
            />
          
        </Row>
        
        {posts.map(post => (
            <Row className='border' style={{alignItems:'center',paddingTop:20,paddingBottom:20,paddingLeft:10}}>
                <Col md={1}>
                <Checkbox />
                </Col>
                <Col md={2}>
                    {post.name}
                </Col>
                <Col  md={3}>
                    {post.email}
                </Col>
                <Col md={3}>
                    {post.phone}
                </Col>
            </Row>
        ))}

        <Modal isOpen={isModalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal} style={{alignSelf:'center'}}>Add Contact</ModalHeader>
            <ModalBody className='ml-3 mr-3'>
            <LocalForm onSubmit={(values) => handleSubmit(values)}>
            <Row className='form-group'>
                    <Label htmlFor="firstname" md={3}>First Name</Label>
                    <Col md={9}>
                        <Control.text model=".firstname" id="firstname" name="firstname"
                            placeholder="First Name"
                            className="form-control"
                            validators={{
                                required, 
                                minLength: minLength(3), 
                                maxLength:maxLength(15)
                            }}
                        />
                        <Errors 
                            className="text-danger"
                            model=".firstname"
                            show="touched"
                            messages={{
                                required: 'Required',
                                minLength: 'Must be greater than 2 characters',
                                maxLength:'Must be 15 characters or less'
                            }}
                        />
                        
                    </Col>

                </Row>
                <Row className='form-group'>
                    <Label htmlFor="lastname" md={3}>Last Name</Label>
                    <Col md={9}>
                        <Control.text model=".lastname" id="lastname" name="lastname"
                            placeholder="Last Name"
                            className="form-control"
                            validators={{
                                required, 
                                minLength: minLength(3), 
                                maxLength:maxLength(15)
                            }}
                        />
                        <Errors 
                            className="text-danger"
                            model=".lastname"
                            show="touched"
                            messages={{
                                required: 'Required',
                                minLength: 'Must be greater than 2 characters',
                                maxLength:'Must be 15 characters or less'
                            }}
                        />
                        
                    </Col>

                </Row>
                <Row className='form-group'>
                    <Label htmlFor="telnum" md={3}>Contact Number</Label>
                    <Col md={9}>
                        <Control.text model=".telnum" id="telnum" name="telnum"
                            placeholder="Tel. Number"
                            className="form-control"
                            validators={{
                                required, 
                                minLength: minLength(3), 
                                maxLength:maxLength(15),
                                isNumber
                            }}
                        />
                        <Errors 
                            className="text-danger"
                            model=".telnum"
                            show="touched"
                            messages={{
                                required: 'Required',
                                minLength: 'Must be greater than 2 characters',
                                maxLength:'Must be 15 characters or less',
                                isNumber:'Must be a number'
                            }}
                        />

                    </Col>

                </Row>
                <Row className='form-group'>
                    <Label htmlFor="email" md={3}>Email</Label>
                    <Col md={9}>
                        <Control.text model=".email" id="email" name="email"
                            placeholder="Email"
                            className='form-control'
                            validators={{
                                required, 
                                validEmail
                            }}
                        />
                        <Errors 
                            className="text-danger"
                            model=".email"
                            show="touched"
                            messages={{
                                required: 'Required',
                                validEmail:'Invalid email address'
                            }}
                        />
                        
                    </Col>

                </Row>
                
                <Row className='form-group'>
                    <Col md={{ size:10, offset:5}}>
                        <Button type='submit' color='primary'>Submit</Button>
                    </Col>
                </Row>      

            </LocalForm>   
            </ModalBody>
        </Modal>
    </div>
    
  );
};

export default Posts;