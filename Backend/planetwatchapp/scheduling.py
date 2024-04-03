# import schedule
# import time
# from .views import floodForecast
# def schedule_tasks():
#         # Schedule the task to run every Sunday at 12:00 AM
#             # schedule.every().sunday.at("00:00").do(floodForecast)
#     schedule.every(1).minutes.do(floodForecast)
#     # Start the scheduling loop
#     while True:
#         schedule.run_pending()
#         time.sleep(1)