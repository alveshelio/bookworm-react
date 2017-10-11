import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Image, Input, Grid, Segment, Button, TextArea } from 'semantic-ui-react'



class BookForm extends Component {
  state = {
    data: {
      goodreadsId: this.props.book.goodreadsId,
      title: this.props.book.title,
      pages: this.props.book.pages,
      cover: this.props.book.covers[0],
      authors: this.props.book.authors,
      description: this.props.book.description,
      averageRating: this.props.book.averageRating,
      link: this.props.book.link,
    },
    covers: this.props.book.covers,
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(props) {
    this.setState({
      data: {
        goodreadsId: props.book.goodreadsId,
        title: props.book.title,
        pages: props.book.pages,
        cover: props.book.covers[0],
        authors: props.book.authors,
        description: props.book.description,
        link: props.book.link,
      },
      covers: props.book.covers,
      index: 0
    })
  }

  onChange = e => this.setState({
    ...this.state,
    data: { ...this.state.data, [e.target.name]: e.target.value }
  });

  onChangeNumber = e => this.setState({
    ...this.state,
    data: { ...this.state.data, [e.target.name]: parseInt(e.target.value, 10) }
  });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    console.log('onSubmit hit');
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data)
        .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
    }
  };

  changeCover = () => {
    const { index, covers } = this.state;
    const newIndex = index + 1 >= covers.length ? 0 : index + 1;
    this.setState({
      index: newIndex,
      data: { ...this.state.data, cover: covers[ newIndex ] }
    })
  };

  validate = data => {
    const errors = {};
    if (!data.title) errors.title =' Can\'t be blank';
    if (!data.authors) errors.authors =' Can\'t be blank';
    if (!data.pages) errors.pages =' Can\'t be blank';

    return errors;
  };

  render() {
    const { title, pages, cover, authors, description, averageRating } = this.state.data;
    const { loading } = this.state;
    return (
      <Segment style={{ marginTop: 30}}>
        <Form loading={loading} onSubmit={this.onSubmit}>
        <Grid divided relaxed stackable>
          <Grid.Row>
            <Grid.Column width={8}>
              <Grid.Row>
                <Grid.Column width={7}>
                  <Form.Field>
                    <label htmlFor='title'>Book Title</label>
                    <Input
                      type='text'
                      id='title'
                      name='title'
                      value={title}
                      onChange={this.onChange}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Form.Field>
                    <label htmlFor='authors'>Authors</label>
                    <Input
                      type='text'
                      id='authors'
                      name='authors'
                      value={authors.join(', ')}
                      onChange={this.onChange}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Row>
                  <Grid columns='equal'>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label htmlFor='pages'># of Pages</label>
                          <Input
                            type='number'
                            id='pages'
                            name='pages'
                            value={pages}
                            onChange={this.onChangeNumber}
                          />
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <label htmlFor='averageRating'>Average Rating</label>
                          <Input
                            type='number'
                            step='0.01'
                            id='averageRating'
                            name='averageRating'
                            value={averageRating}
                            onChange={this.onChangeNumber}
                          />
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Row>
                <Grid.Column width={2}>
                  <Form.Field>
                    <label htmlFor='description'>Description</label>
                    <TextArea
                      id='description'
                      name='description'
                      rows='8'
                      value={description}
                      onChange={this.onChange}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={8}>
              <Grid.Row>
                <Grid.Column style={{textAlign: 'center'}} width={16}>
                  <p>Covers:</p>
                  <div>
                  <Image centered size='small' src={cover} />
                  {
                    this.state.covers.length > 1 &&
                    <Button circular size='tiny' primary style={{ marginTop: 15 }} tabIndex={0} onClick={this.changeCover}>Switch Cover</Button>
                  }
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
          <Grid centered>
            <Button onClick={this.onSubmit}>Save Book</Button>
          </Grid>
      </Form>
      </Segment>
    );
  }
}

BookForm.propTypes = {
  submit: PropTypes.func.isRequired,
  book: PropTypes.shape({
    goodreadsId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    pages: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired
};

export default BookForm;
