import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import notefulContext from '../noteful-context';
import config from '../config';
import PropTypes from 'prop-types';
import './note.css';

export default class Note extends Component {
    static defaultProps = {
      onDeleteNote: () => {}
    };

    static contextType = notefulContext;

    handleClickDelete = e => {
      e.preventDefault();
      const note_id = this.props.id;
      console.log(note_id)

      fetch(`${config.API_ENDPOINT}/api/notes/${note_id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
      })
      .then (res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return null;
      })
      .then(() => {
        this.context.deleteNote(note_id);
        this.props.onDeleteNote(note_id);
      })
      .catch(error => {
        console.error({error});
      });
    }

    render () {  
      const {name , id, modified} = this.props; 

      return (
        <div className='Note'>

          <h2 className='Note__title'>
            <Link to={`/notes/${id}`}>
              {name}
            </Link>
          </h2>

          <button 
            className='Note__delete' 
            type='button'
            onClick={this.handleClickDelete}>
            {' '}
            Remove

          </button>

          <div className='Note__dates'>
            
            <div className='Note__dates-modified'>
              Modified
              {' '}
            
              <span className='Date'>
                {new Date(modified).toDateString()}
              </span>
            
            </div>
          </div>
        </div>
      )
    }
  }

  Note.propTypes = 
  { name: PropTypes.string,
    modified: PropTypes.string,
    id:PropTypes.string }


//proptype for onDelete not needed. I am using context here.