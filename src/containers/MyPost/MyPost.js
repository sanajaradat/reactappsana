import React, { Component } from 'react';

import AllPosts from '../../components/AllPosts/AllPosts';
import PostDetail from '../../components/PostDetail/PostDetail';
import AddPost from '../../components/AddPost/AddPost';
import './MyPost.css';
import axios from 'axios';
class MyPost extends Component {
state={
    posts:[],
    selectedPostId:null,
    error:false
}
    componentDidMount(){
axios.get('/posts')
.then(response=>{
   
    const posts=response.data.slice(0,4);
    const updatedPosts=posts.map(post=>{
        return {
            ...post,
            author:'amer'
        }
    });
    this.setState({posts:updatedPosts})
})
.catch(error=>{
    console.log(error)
    this.setState({error:true})
});

    }
    mypostDetail=(id)=>{
        this.setState({selectedPostId:id})
    }
    render () {
       let posts=<p style={{textAlign:'center'}} >Something went wrong</p>
        if(!this.state.error){
        posts=this.state.posts.map(post=>{
           return <AllPosts 
           key={post.id}
           title={post.title}
           author={post.author}
           clicked={()=>this.mypostDetail(post.id)}
           />
       })
       
    }
        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <PostDetail id={this.state.selectedPostId} />
                </section>
                <section>
                    <AddPost />
                </section>
            </div>
        );
    }
}

export default MyPost;