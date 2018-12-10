'use strict'

//model
const Post = use('App/Models/Post')

//database
const Database = use('Database')

//validaor
const {validate} = use('Validator')

class PostController {
    async index ({view}) {
        const posts = await Post.all()
        return view.render('posts.index',{
          title: 'Post',
          data: posts.toJSON()
        })
    }

    async add ({view}){
        return view.render('posts.add', {
            title: 'Add'
        })
    }

    async store({response, request, session}){
        const post = new Post()
        post.title      = request.input('title')
        post.content    = request.input('content')

        const rules = {
            title: 'required|min:3|max:50|unique:posts',
            content: 'required'
        }

        const wew_validation = await validate(request.all(), rules)
        if(wew_validation.fails()){
            session.withErrors(wew_validation.messages()).flashAll()
            return response.redirect('post/add')
        }

        await post.save()

        session.flash({notification : 'Post Added!'})

        return response.redirect('back')

    }

    async edit ({params, view}){
        const post = await Post.find(params.id)
        return view.render('posts.edit', {
            title: 'Edit',
            data: post
        })
    }

    async update({response, request, session, params}) {
        const post = new Post()
        post.title      = request.input('title')
        post.content    = request.input('content')

        const rules = {
            title: 'required|min:3|max:50',
            content: 'required'
        }

        const wew_validation = await validate(request.all(), rules)
        if(wew_validation.fails()){
            session.withErrors(wew_validation.messages()).flashAll()
            return response.redirect('back')
        }

        await Database
            .table('posts')
            .where('id', params.id)
            .update({ title: post.title, content: post.content })


        session.flash({notification : 'Post Edited!'})

        return response.redirect('back')
    }

    async delete ({response, request, session, params}){
        const delete_row = await Database
            .table('posts')
            .where('id', params.id)
            .delete()

        session.flash({delete_notif : 'Post Deleted!'})

        return response.redirect('back')
    }
}

module.exports = PostController
