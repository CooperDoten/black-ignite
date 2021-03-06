import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import './EditCategory.css';
import LinearProgress from '@material-ui/core/LinearProgress';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class PosterDropzone extends Component {
  state = {
    posterUrl: '',
    uploadPercentage: 0
  }

  // Calling dataToSend function with info
  handleFinishedUpload = async(info) => {
    this.dataToSend(info);
  }

  // Setting local state with file url path
  dataToSend  = async(info) => {
    await
      this.setState({
          posterUrl: info.fileUrl
      });
      this.props.setOurPosterState(this.state.posterUrl);
  }
  
  // Upload progression
  onUploadProgress = (percent) => { 
    this.setState({
      uploadPercentage: percent
    });
  }

  render() {
    const uploadOptions = {}
    const s3Url = `http://${process.env.REACT_APP_S3_BUCKET}.s3.amazonaws.com`;
    const dropZoneStyle = {
      height: '200px',
      width: '200px',
      border: '2px dashed',
      borderRadius: '4px',
      borderColor: '#246399',
      display: 'flex',
      flexWrap: 'wrap',
      cursor: 'pointer',
      backgroundImage: 'url(/upload-image-orange-background.png)',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    }
   
    return (
      <>
        <DropzoneS3Uploader
          onFinish={this.handleFinishedUpload}
          s3Url={s3Url}
          accept="image/*,audio/*,video/*"
          // maxSize={1024 * 1024 * 5}
          upload={uploadOptions}
          style={dropZoneStyle}
          onProgress={this.onUploadProgress}
        />
        <LinearProgress 
          className="progressBar"
          variant="determinate" 
          value={this.state.uploadPercentage} 
        />
      </>
    );
  }
}

export default connect(mapStoreToProps)(PosterDropzone);