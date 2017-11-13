class UsersController < ApplicationController
  def new
  	@user = User.new
  	@users = User.all
  end

  def create
  	user = User.new(user_params)
  	if user.save!
  		msg = "User Create Sucessfully"
  		redirect_to :new_user
  	else
  		msg = "Problem creating user please try after some time"
  	end
  end

  def edit
  	@user = User.where(id: params[:id]).first
  	@users = User.all
  end

  def destroy
  	user = User.where(id: params[:id]).first
  	if user.destroy
  		msg = "User Deleted Sucessfully"
  		redirect_to :new_user
  	else
  		msg = "Problem deleting user please try after some time"
  		redirect_to :new_user
  	end
  end

  private

  def user_params
    params.require(:user).permit(:dob,:name,:mobile)
  end
end
