json.array! @messages do |message|
  json.user_name message.user.name
  json.date      message.created_at
  json.content   message.content
  json.id        message.id
  json.image     message.image.url
end
