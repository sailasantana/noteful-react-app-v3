import React, {Component} from 'react';
import notefulContext from '../noteful-context';
import NotefulForm from '../NotefulForm/noteful-form';
import ErrorBoundary from '../error-boundary';
import config from '../config';
import './add-note.css';
import PropTypes from 'prop-types'

export default class AddNote extends Component {
    static defaultProps = {
        history: {
            push: () => {}
        },
    }

    static contextType = notefulContext; 

    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            },
            content: {
                value: '',
                touched: false
            },
            folder: {
                value: '',
                touched: false
            },
        };

    }

    updateName(name) {
        this.setState({name: {value: name, touched: true}});
    }

    updatedContent(content) {
        this.setState({content: {value: content, touched: true}});
    }

    updateFolderSelect(folder) {
        this.setState({folder: {value: folder, touched: true}});
    }

    validateFolderName() {
        let folderName = this.state.folder.value.trim();
        if (folderName.length === 0) {
            return "Please select an existing folder."
        }
    }

    validateName() {
        const noteTitle = this.state.name.value.trim();
        if (noteTitle.length === 0) {
            return "Please enter a title for your note."
        }
        else if (noteTitle.length < 3) {
            return "Please enter a note title that is at least 3 characters in length.";
        }
    }

    validateContent() {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
            return "Please enter some note text.";
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        const newNote = {
            folderId: e.target['note-folder-id'].value,
            name: e.target['note-name'].value,
            content: e.target['note-content'].value,
            modified: new Date(),
        };

        fetch(`${config.API_ENDPOINT}/notes`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newNote),
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json();
        })
        .then(note => {
            this.context.addNote(note);
            this.props.history.push(`/notes/${note.id}`);
        })
        .catch(error => { 
            console.error({error});
        });
    }

    render() {
        const {folders = []} = this.context;

        return (
            <section className="AddNote">
                <h2>
                    Create a new note: 
                </h2>

                <NotefulForm onSubmit={this.handleSubmit}>
                    
                    <div className="field">
                        
                        <label htmlFor="note-name-input">
                            Note Title:
                        </label>

                        <input type="text" id="note-name-input" name="note-name" onChange={e => this.updateName(e.target.value)}/>
                        <ErrorBoundary message={this.validateName()}/>

                    </div>
                    
                    <div className="field">

                        <label htmlFor="note-content-input">
                            Content:
                        </label>

                        <textarea id="note-content-input" name="note-content" onChange={e => this.updatedContent(e.target.value)}/>
                        <ErrorBoundary message={this.validateContent()}/>

                    </div>
                    <div className="field">
                    
                    
                        <label htmlFor="note-folder-select">
                            Folder:
                        </label>
                        

                        <select id="note-folder-seiect" name="note-folder-id">
                            
                            {folders.map(folder => 
                                <option key={folder.id} value={folder.id} onChange={e => this.updateFolderSelect(e.target.value)}>
                                {folder.name}
                                </option>
                                )}
                            
                        </select>
                        </div>
                    <ErrorBoundary message={this.validateFolderName()}/>

                   

                    <div className="buttons">
                        <button
                            type="submit"
                            disabled= {
                                this.validateName() ||
                                this.validateContent()
                            }>

                            Add Note
                        </button>
                    </div>
                </NotefulForm>
            </section>
        );
    }
}

AddNote.propTypes = 
{ history: PropTypes.object }

