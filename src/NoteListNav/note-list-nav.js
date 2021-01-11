import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';
import CircleButton from '../Circle-button/circle-button';
import notefulContext from '../noteful-context';
import './note-list-nav.css';
import {countNotesForFolder } from '../helper'

export default class NoteListNav extends Component {
    static contextType = notefulContext; 

    render () {
        const { folders=[], notes=[] } = this.context;

        return (
            <div className="NoteListNav">
                
                <ul className="NoteListNav__list">
                    {folders.map((folder,index) =>
                        <li key={index}>
                            <NavLink
                                className="NoteListNav__folder-link"
                                to={`/folders/${folder.id}`}>
                                 <span className="NoteListNav__num-notes">
                                    {countNotesForFolder(notes, folder.id)}
                                </span>
                                {folder.folder_name}
                            </NavLink>
                        </li>
                    )}
                </ul>

                <div className="NoteListNav__button-wrapper">
                    <CircleButton
                        tag={Link}
                        to='/add-folder'
                        type='button'
                        className='NoteListNav__add-folder-button'>
                        <br/>
                        Folder
                    </CircleButton>
                </div>

            </div>
        );
    }
}
