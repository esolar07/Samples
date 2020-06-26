import React from 'react';
import { translate, Trans } from 'react-i18next';
import MediaControls from '../components/mediaControls';
import getUserMedia from 'getusermedia';
import { connect } from 'react-redux';

class ModalVideoPreview extends React.Component {

    constructor(props) {
        super(props);
        this.toggleCloseModal = this.toggleCloseModal.bind(this);
        this.toggleContinueModal = this.toggleContinueModal.bind(this);
        this.getVideoStyle = this.getVideoStyle.bind(this);
    }

     toggleCloseModal(e) {
        this.props.onCloseButton(false);
    }

    toggleContinueModal(e) {
        this.props.onContinueButton();
    }

    getVideoStyle(video) {
          var styles = {};
          if(video){
            styles['display'] = 'block';
            }
            else{
            styles['display'] = 'none';
            }
             console.log(styles);
            return styles;
    }

    render() {
        const { t, i18n, isPreview } = this.props;

        let openModal = this.props.isOpen;
        let message = "";
        let showStatus = 'modal wait-modal fade';
        let innerStyle = {
            display: 'none',
        };

        console.log("Preview");
        console.log(isPreview);
        console.log(this.props.media);
        let {camera, microphone, cameraPermission, microphonePermission} = this.props.media;

        let displayVideo = (isPreview & camera & cameraPermission);

        if(openModal)
        {
            console.log("MODAL VIDEO");

            showStatus = 'modal wait-modal fade show';
            innerStyle = {
                display: 'block',
            };

           if(displayVideo) {
                getUserMedia({video: true, audio: false},
                (error, stream) => {
                    console.log(error);
                    let vid = document.getElementById('preview');
                    if(vid)
                        vid.srcObject = stream;
                    }
                );
            }

            if( (camera & microphone) == false ){
                if(!camera & microphone){
                   message='no camera';
                } else if(camera & !microphone){
                        message='no microphone';
                } else {
                        message='no media';
                }
             }
             else {
                    message='conference ready';
             }
        }
        console.log(message);
        return(

            <div className={showStatus} tabIndex="-1" role="dialog" style={innerStyle}>
                {
                this.props.isOpen ?
               <MediaControls />
               :
               ''
               }
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="modal-body-text">
                    { t(message) }
                     <br /> { t('wish to continue') }
                    <div  style={ this.getVideoStyle(displayVideo) }>
                        <video autoPlay="true" id="preview" className="col"></video>
                         </div>
                    </div>
                  </div>
                  <div className="modal-footer ">
                     <button type="button" onClick={ this.toggleContinueModal } className="btn btn-red" data-dismiss="modal">{ t('continue') }</button>
                     <button type="button" onClick={ this.toggleCloseModal } className="btn btn-red" data-dismiss="modal">{ t('close') }</button>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        media: state.media
    }
}
export default translate('translations')(connect(mapStateToProps, { getUserMedia })(ModalVideoPreview));
