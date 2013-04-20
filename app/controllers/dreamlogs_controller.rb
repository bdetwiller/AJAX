class DreamlogsController < ApplicationController
	def index
		respond_to do |format|
			format.json { render json: Dreamlog.all }
			format.html { render :index }
		end
	end

	def create
		@dreamlog = Dreamlog.create!(params[:dreamlog]);

		respond_to do |format|
			format.json { render json: @dreamlog }
		end

	end

end
