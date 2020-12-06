import React, {Component} from 'react';
import Note from '../Note/note';
import notefulContext from '../noteful-context';
import {findNote} from '../helper';
import './note-page-main.css';
import PropTypes from 'prop-types';


export default class NotePageMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    };

    static contextType = notefulContext;

    handleDeleteNote = id => {
        this.props.history.push(`/`)
    };
    
    render () {
        const {notes=[]} = this.context;
        const {id} = this.props.match.params;
        const note = findNote(notes, id) || {content: ''};

        return (
            <section className="NotePageMain">
                <Note
                    id={note.id}
                    name={note.name}
                    content= {note.content}
                    modified={note.modified}
                    onDeleteNote={this.handleDeleteNote}/>
                
                <div className='NotePageMain__content'>
                    
                    {note.content.split(/\n \r|\n/).map((para, i) =>
                    
                    <p key={i}>{para}</p>
                    
                    )}
                </div>
                
            </section>
        );
    }
}


NotePageMain.propTypes = 
{ match: PropTypes.string,
  history: PropTypes.string  }