import * as React from 'react'
import {sings} from "../../../reducer/sings";

export class EditSing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.sing.name,
            author: props.sing.author,
            description: props.sing.description,
            album: props.sing.album,
        }
    }

    render() {
        return (
            <tr key={this.props.sing.ID}>
                <td>{this.props.index}</td>
                <td>
                    <input value={this.state.name}
                           onChange={(event) => this.setState({ name: event.target.value })}/>
                </td>
                <td>
                    <input value={this.state.author}
                           onChange={(event) => this.setState({ author: event.target.value })}/>
                </td>
                <td>
                    <input value={this.state.description}
                           onChange={(event) => this.setState({ description: event.target.value })}/>
                </td>
                <td>
                    <input value={this.state.album}
                           onChange={(event) => this.setState({ album: event.target.value })}/>
                </td>
                <td style={{cursor: 'pointer'}} onClick={this.editSing}>Cохр.</td>
                <td/>
            </tr>
        )
    }

    editSing = () => {
        this.props.editSing(this.props.sing.ID, {
            name: this.state.name,
            author: this.state.author,
            description: this.state.description,
            album: this.state.album,
        });
        this.props.reset()
    }
}