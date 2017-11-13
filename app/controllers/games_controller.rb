class GamesController < ApplicationController
	#before_action :new
  def new
  	@game = ScoreDatum.new
  	@time = Time.now.to_i

  	#debugger
  end

  def create
  	create_update
  end

  def index
  	@games = Leader.includes(:user)
  end
 
  def create_update
  	if session[:user_id].present?
	  	#if params[:score_id].blank?
	  	       @f1 = ScoreDatum.where(:frame_id => params[:frame_id],:game_id => session[:game_id]).first
	  	       total = 0
	  	       score = params[:try].map{|a| a.to_i}
	  	       score = score[0]+score[1]
	  	       if @f1.blank?
	  	         total = score
	  	       else
	  	       	 if @f1.score == 10
	  		   	 	total = find_total(@f1.try_score.map{|a| a.to_i},params[:try].map{|a| a.to_i}) 
	  		   	 	@f1.update_columns({subsequent_score: (total+@f1.try(:subsequent_score))})
	  		   	 end
	  		   end
	  		   @game = ScoreDatum.new(game_id: session[:game_id],frame_id: params[:frame_id].to_i + 1 ,try_score: params[:try],:score => score,:user_id => params[:user_id],:subsequent_score => score+@f1.try(:subsequent_score).to_i)
	  		if @game.save
	  			@msg = "Score saved Sucessfully"
	  		else
	  			@msg = "Problem saving  please update again"
	  		end
	  		   	 	#debugger
	  	# else
	  	# 	@game = ScoreDatum.where(:id => params[:score_id]).first
	  	# 	total = find_total(@game.try_score.map{|a| a.to_i},@game.try_score.map{|a| a.to_i})
	  	# 	if @game.present? && @game.update(frame_id: params[:f_id] ,spare_score: params[:spare],:score => total,:user_id => params[:user_id])
	  	# 		@msg = "Score updated Sucessfully"
	  	# 	else
	  	# 		@msg = "Problem saving score please update again"
	  	# 	end
	  	# end
	 else
	   @msg = "User is Empty please select a user"
     end
	   respond_to do |format|
	  		msg = { :message => @msg ,:data => @game,:old_frame_seq_score => @f1.try(:subsequent_score)}
	    	format.json  { render :json => msg } # don't do msg.to_json
	   end
	end

	def edit
		if params[:score_id].present?
			debugger
			@game = ScoreDatum.where(:id => params[:score_id]).first
			try = @game.try
			spare = @game.spare
			respond_to do |format|
	  			msg = {  try1: try[0] ,try2: try[1],spare1: spare[0],spare2: spare[1]}
	    		format.json  { render :json => msg } # don't do msg.to_json
	  		 end
		end
	end

	def find_total(t,s)
		s_total = s[0]+ s[1]
		total = 0
		if t[0] == 10
			total = s_total 
		elsif (t[0] + t[1]) == 10
			total =  s[0] + s_total
		end
		return total
	end
        def show
         if params[:type] == 'create'
           create_session
         elsif params[:type] == 'show'
       		 @games = ScoreDatum.where(user_id:  params[:user_id],game_id: params[:id]).includes(:user)
       		 render :partial=>"score_list"
         else
           end_session
         end
        end
	def create_session
		session[:user_id] = params[:user_id]
		session[:game_id] = params[:game_id]
		respond_to do |format|
			msg = {  message: 'Session has been created Sucessfully,Do not refresh the page'}
			format.json  { render :json => msg } # don't do msg.to_json
		 end
	end

	def end_session
		session[:user_id] = nil
		session[:game_id] = nil
		respond_to do |format|
  			msg = {  message: 'Session has been removed Sucessfully,Please Refresh the page'}
    		format.json  { render :json => msg } # don't do msg.to_json
  		 end
	end

end


