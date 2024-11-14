FROM thenoface/jamkkaebi_python312_base:latest
ENV FASTAPI_PORT=8000
ENV FASTAPI_HOST=0.0.0.0
EXPOSE 9000 8000
WORKDIR /fastapi
COPY . .
RUN chmod a+x entrypoint.sh
ENTRYPOINT [ "./entrypoint.sh" ]
