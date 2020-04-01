import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Character extends Component {
    state = {
        showModal: false
      };
    constructor(props) {
      super(props);
      const { instance } = props;
  
      this.id = instance.id;
      this.name = instance.name;
      this.image = `${instance.thumbnail.path}.${instance.thumbnail.extension}`;
      this.description = (!instance.description.length ? 'Description not available.' :
        instance.description.length > 150 ? instance.description.substring(0, 150).split('').concat('...').join('') : instance.description);
    }
        render() {
            return (
        <div>
            <h1>{this.name}</h1>
            <p>{this.description}</p>
            <img src={this.image} alt=""/>
        </div>
    )
}
}
Character.propTypes = {
    instance: PropTypes.object.isRequired,
  };

export default Character;
