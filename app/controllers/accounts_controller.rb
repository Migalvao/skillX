class AccountsController < ApplicationController
  # protect_from_forgery with: :null_session
  include AuthenticationConcern

  def get_signup
    

    render(inertia: 'Show',
    props: {
      event: {"test": "test"}
    })


    # render "accounts/signup", status: 500
  end

  def post_signup

    user = User.new(signup_params())

    if user.save
      redirect_to index
    else
      res = {"errors" => user.errors}
      render(:json => res)
    end

  end

  def get_login
    if @current_user
      redirect_to "/home"
    else
      render(inertia: 'Login')
    end
    
  end

  def post_login
    if not params["password"]
      error = {"error" => "Password missing"}
      render(inertia: 'Login', props: error, status: 400)
    end

    if params["username"]
      user = User.find_by(username: params["username"])
    elsif params["email"]
      user = User.find_by(email: params["email"])
    else
      error = {"error" => "Username/email missing"}
      render(inertia: 'Login', props: error, status: 400)
    end

    if user
      if user.authenticate(params["password"])
        #sucess
        session["user_id"] = user.id
        redirect_to "/home"

      else
        error = {"error" => "Wrong password"}
        render(inertia: 'Login', props: error, status: 401)
      end

    else
      # User not found
      error = {"error" => "User not found"}
      render(inertia: 'Login', props: error, status: 404)
    end
  end

  def logout
    session["user_id"] = nil
    redirect_to '/login'
  end


  def get_profile
    if @current_user
      user = User.find_by(id: params[:id].to_i)

      if not user
        render(inertia: 'NotFound')
        return
      end

      if @current_user.id == user.id
        #own profile, can edit
        user_json = user.as_json(only: [:id, :name, :username, :description])
        res = {"can_edit": true, "user": user}

      else
        #not own profile, can't edit
        user_json = user.as_json(only: [:id, :name, :username, :description])
        res = {"can_edit": false, "user": user}
      end

      render(inertia: 'Profile', props: res)
    else
      render(inertia: 'Login')
    end
  end

  def get_edit_profile
    if @current_user
      user = User.find_by(id: params[:id].to_i)

      if not user
        render(inertia: 'NotFound')
        return
      end
      

      if @current_user.id == user.id
        #own profile, can edit
        user_json = user.as_json(only: [:id, :name, :username, :email, :description])
        render(inertia: 'EditProfile', props: {"user": user_json})

      else
        #not own profile, can't edit
        user_json = user.as_json(only: [:id, :name, :username, :description])
        res = {"can_edit": false, "user": user_json}

        redirect_to('/users/' + user.id.to_s)
      end

    else
      render(inertia: 'Login')
    end
  end

  def update_profile

    if @current_user
      user = User.find_by(id: params[:id].to_i)

      if not user
        render(inertia: 'NotFound')
        return
      end

      puts params

      if @current_user.id == user.id
        #own profile, can edit

        if user.update(signup_params())

          redirect_to('/users/' + user.id.to_s)

        else

          user_json = user.as_json(only: [:id, :name, :username, :email, :description])
          render(inertia: 'EditProfile', props: {"error": user.errors.full_messages, "user": user_json})

        end

      else
        #not own profile, can't edit
        user_json = user.as_json(only: [:id, :name, :username, :description])
        res = {"can_edit": false, "user": user}

        redirect_to('/users/' + user.id.to_s)
      end
    else
      render(inertia: 'Login')
    end
  end


  private
  def signup_params
      #filters parameters
    params.permit(:name, :username, :email, :password, :description)
  end
end