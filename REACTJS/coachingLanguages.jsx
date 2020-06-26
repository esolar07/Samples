import React from 'react'
import { translate, Trans } from 'react-i18next';
import {  Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';

class CoachingLanguages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.save = this.save.bind(this);
    }
    save(evt) {
        let { saveChanges, toggleModal } = this.props;
        saveChanges(evt);
        toggleModal();
    }

    render() {
        const { t, i18n, toggleModal, showModal, coachingLanguages, selectedLanguages, inputHandler, disabled } = this.props;
        let langs = [];
        if(coachingLanguages !== undefined) {
            langs = this.props.coachingLanguages
                .filter(element => element.selected === false)
                .map(
                (language, index) => 
                    <Label check className="col" key={index}>
                        <Input 
                            type="checkbox" 
                            id={ "language"+language.id } 
                            name={ "language"+language.id }  
                            onChange={ inputHandler }
                            checked={ selectedLanguages.indexOf(language.id) !== -1 ? true : false }
                        /> { ' ' + t(language.name) }
                    </Label>
            );
        }
        return (
            <Modal isOpen={showModal} toggle={toggleModal} className="modal-dialog">
                <ModalHeader>{t('coaching languages')}</ModalHeader>
                <ModalBody>
                { langs }
                </ModalBody>
                <ModalFooter>
                    <Button color="success" disabled={ disabled } onClick={ this.save }>{t('save')}</Button>
                    <Button color="warning" onClick={ toggleModal }>{t('close')}</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default translate('translations')(CoachingLanguages);
